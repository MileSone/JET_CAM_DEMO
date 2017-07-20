/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'mbe'],
        function (oj, ko, $, app, mbe) {

            function AboutViewModel() {
                var self = this;
                self.appTitle = ko.observable();
                //self.appTitle = mbe.appConfig.welcome;
                //use the Cordova camera plugin to take a picture
                self.takePicture = function (theID) {
                    if (navigator.camera && typeof navigator.camera !== "undefined") {
                        //sample camera options, using defaults here but for illustration....
                        //Note that the destinationType can be a DATA_URL but cordova plugin warns of memory usage on that.
                        var cameraOptions = {
                            quality: 50,
                            destinationType:  Camera.DestinationType.FILE_URI,
                            sourceType: Camera.PictureSourceType.CAMERA,
                            allowEdit: false,
                            encodingType: Camera.EncodingType.JPEG,
                            saveToPhotoAlbum: true,
                            correctOrientation: true
                        };
                        //use camera pluging method to take a picture, use callbacks for handling result
                        navigator.camera.getPicture(cameraSuccess, cameraError, cameraOptions);
                    } else {
                        //running on web, the navigator.camera object will not be available
                        console.log("The navigator.camera object is not available.");
                    }
                };

                function cameraSuccess(imageData) {
                    //returns a file path such as: file:///storage/emulated/0/Android/data/org.oraclejet.mcsexample/cache/1459277993352.jpg
                    //set observable to the path and img tag's src attributein view will be updated.
                    var timeName = getTime();

                    var tempData = {
                        "Name": timeName + ".jpg",
                        "Content": imageData
                    };
                    console.log("tempData", tempData);
                    self.imageArray.push(tempData);
                    self.displayImageThumbnail();
                }

                function cameraError(error) {
                    console.log(error);
                }

                // Header Config
                self.headerConfig = {'viewName': 'header', 'viewModelFactory': app.getHeaderModel()};

                // Below are a subset of the ViewModel methods invoked by the ojModule binding
                // Please reference the ojModule jsDoc for additionaly available methods.

                /**
                 * Optional ViewModel method invoked when this ViewModel is about to be
                 * used for the View transition.  The application can put data fetch logic
                 * here that can return a Promise which will delay the handleAttached function
                 * call below until the Promise is resolved.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
                 * the promise is resolved
                 */
                self.handleActivated = function (info) {
                    // Implement if needed

                 
                };

                /**
                 * Optional ViewModel method invoked after the View is inserted into the
                 * document DOM.  The application can put logic that requires the DOM being
                 * attached here.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
                 */
                self.handleAttached = function (info) {
                    // Implement if needed
                };


                /**
                 * Optional ViewModel method invoked after the bindings are applied on this View. 
                 * If the current View is retrieved from cache, the bindings will not be re-applied
                 * and this callback will not be invoked.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 */
                self.handleBindingsApplied = function (info) {
                    // Implement if needed
                };

                /*
                 * Optional ViewModel method invoked after the View is removed from the
                 * document DOM.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
                 */
                self.handleDetached = function (info) {
                    // Implement if needed
                };
            }

            /*
             * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
             * each time the view is displayed.  Return an instance of the ViewModel if
             * only one instance of the ViewModel is needed.
             */
            return new AboutViewModel();
        }
);
