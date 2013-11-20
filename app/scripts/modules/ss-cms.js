
//Create the contentTools module
var contentTools = angular.module('contentTools',[]);

//ContentManager factory
contentTools.factory('ctContentManager', function () {

    var ContentManager = function (args) {

        //Remove the need to use the new keyword
        if (!(this instanceof ContentManager)) {
            return new ContentManager(args);
        }

        this.args = args;

        //Edit mode not active by default
        this.isEdit = false;

    };

    ContentManager.prototype.editMode = function (action) {

        if (action === 'toggle') {

            if (this.isEdit === true) {

                this.isEdit = false;
                this.args.scope.$broadcast('ssTrigger', 'hide');

            } else {

                this.isEdit = true;
                this.args.scope.$broadcast('ssTrigger', 'show');

            }

        }

    };

    return ContentManager;

});

//contentContainer directive
contentTools.directive('ctContentContainer', function ($templateCache, $rootScope) {

    

    //Content templates
    var templates = {
        "div|text": {
            "edit": "<label>{{name}}</label><input type='text' id='{{id}}' class='{{class}} contentInput' ng-model='{{model}}' value='{{content}}'/>",
            "view": "<h3>{{name}}</h3><span id='{{id}}' class='{{class}}'>{{content}}</div>"
        },
        "div|textarea": {
            "edit": "<label>{{name}}</label><textarea id='{{id}}' class='{{class}} contentInput' ng-model='{{model}}'>{{content}}</textarea>",
            "view": "<h3>{{name}}</h3><span id='{{id}}' class='{{class}}'>{{content}}</div>"
        },        
        "hidden|text": {
            "edit": "<label>{{name}}</label><input type='text' id='{{id}}' class='{{class}} contentInput' ng-model='{{model}}' value='{{content}}'/>",
            "view": ""
        },        
        "select|ul": {
            "edit": "<ul></ul>",
            "view": "<select>{{items}}</select>"
        },
        "common": {
            "editButton": "<input type='button' value='Edit' class='editButton' style='clear:both'/>",
            "editControls": "<span><input type='button' value='Save' class='saveButton'/><input type='button' value='Cancel' class='cancelButton'/></span>",
            "editModeContainer": "<div class='content-container'><div class='content-controls'></div><div class='content-area'></div></div>"
            //"editButton": "<a href='#' class='editLink'>Edit</a>"
        }
    };

    //Function to compile a template
    var compileTemplate = function (itemType, itemMode, itemData) {

        //Variables
        var template, key;

        console.log("HERE BOSS " + itemType + " || " + itemMode);
        //Get target template
        template = templates[itemType][itemMode];

        //Loop through supplied data and insert into template
        for (key in itemData) {

            //Check key isn't from prototype
            if (itemData.hasOwnProperty(key)) {

                template = template.replace('{{' + key + '}}', itemData[key]);

            }

        }

        //Create jQuery object from template
        template = $(template);

        //If edit mode template
        if (itemData.editMode === true) {

            var templateTemp = $(templates.common.editModeContainer);
            templateTemp.find('.content-area').append(template);
            template = templateTemp;
        }
   
        if (itemMode === 'edit') {
            //console.log(templates.common.editButton);

            template.find('.content-controls').append($(templates.common.editControls));

        } else {

            if (itemData.editMode === true) {
                console.log(template);
                template.find('.content-controls').append($(templates.common.editButton));

            }

        }

        return template;

    };

    return {

        //restrict: 'E',
        link: function postLink(scope, element, attrs) {


            //Variables
            var content = scope.content[attrs.model],
                status = 'view',
                editMode,
                template,
                disableEdit,
                enableEdit,
                startEdit,
                endEdit;

            console.log('in module');
            console.log(attrs);

            element.html(compileTemplate(attrs.ctContentContainer, 'view', {
                model: attrs.model,
                content: scope.content[attrs.model],
                name: attrs.name,
                editMode: false
            }));

            /**
             *   Change a content field from view to edit
             **/
            startEdit = function () {

                //Build template for view mode
                template = compileTemplate(attrs.ctContentContainer, 'edit', {
                    model: attrs.model,
                    content: scope.content[attrs.model],
                    name: attrs.name,
                    editMode: editMode
                });

                //template = $(template);

                template.find('.saveButton').click(function () {
                    endEdit('save');
                });

                template.find('.cancelButton').click(function () {
                    endEdit('cancel')
                });

                //Apply the template
                element.html(template);


            };

            /**
             *   Change a content field from edit to view
             **/
            endEdit = function (closeAction) {

                //If a save flag has not been provided, or an unsupported flag has been provided
                if (closeAction === 'undefined' || (closeAction !== 'cancel' && closeAction !== 'save')) {

                    //Set action to cancel
                    closeAction = 'cancel';

                }

                //Close edit mode without saving any changes
                if (closeAction === 'cancel') {

                    //Apply the template
                    enableEdit();

                } else if (closeAction === 'save') {

                    //Save changes back to model on $scope
                    scope.$apply(function(){
                        scope.content[attrs.model] = $(element).find('.contentInput').val();
                        
                        console.log("SCOPE APPLY: " + scope.content[attrs.model]);
                    });    
                    

                    //Apply the template
                    enableEdit();

                }

            };

            /**
             *   Disable edit mode / remove 'edit' buttons
             **/
            disableEdit = function (closeAction) {
                
                editMode = false;

                //Build template for view mode
                template = compileTemplate(attrs.ctContentContainer, 'view', {
                    model: attrs.model,
                    content: scope.content[attrs.model],
                    name: attrs.name,
                    editMode: editMode
                });

                //Apply the template
                //element.find($('.editButtonContainer')).remove();
                element.html(template);
            };

            /**
             *   Enable edit mode / add 'edit' buttons
             **/
            enableEdit = function () {

                editMode = true;

            console.log("ooh ooh me me me");
            console.log(attrs.ctContentContainer);
            console.log(attrs);

                //Build template for view mode
                template = compileTemplate(attrs.ctContentContainer, 'view', {
                    model: attrs.model,
                    content: scope.content[attrs.model],
                    name: attrs.name,
                    editMode: editMode
                });

                //Convert the tempalte string into a jquery object.
                //template = $(template);

                //Apply the click event to start editing
                template.find('.editButton').click(function () {

                    startEdit();

                });

                //Apply the template
                $(element).html($(template));

            };

            //listen for a trigger event to change the status of the element
            $rootScope.$on('ssTrigger', function (event, msg) {

                if (msg === 'hide') {
                    //alert('save');
                    //Disable edit mode with save / cancel instruction
                    disableEdit('save');

                } else {

                    //Enable edit mode
                    enableEdit();

                }

            });


        }

    };

});