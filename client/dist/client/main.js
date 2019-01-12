(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/admin/admin-acl-management/acl-service.service.ts":
/*!*******************************************************************!*\
  !*** ./src/app/admin/admin-acl-management/acl-service.service.ts ***!
  \*******************************************************************/
/*! exports provided: AclServiceService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AclServiceService", function() { return AclServiceService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AclServiceService = /** @class */ (function () {
    function AclServiceService() {
        this.rights = [
            { key: "TEAM", value: false },
            { key: "USER", value: false },
            { key: "DIVISION", value: false },
            { key: "STANDINGS", value: false },
            { key: "CASTER", value: false },
            { key: "MATCH", value: false },
            { key: "SCHEDULEGEN", value: false },
            { key: "ACL", value: false }
        ];
    }
    AclServiceService.prototype.removeUnwantedProps = function (acl) {
        if (acl.adminRights) {
            //delete properties we don't want
            delete acl.adminRights.adminId;
            delete acl.adminRights.__v;
            delete acl.adminRights._id;
        }
        return acl;
    };
    AclServiceService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], AclServiceService);
    return AclServiceService;
}());



/***/ }),

/***/ "./src/app/admin/admin-acl-management/admin-acl-management.component.css":
/*!*******************************************************************************!*\
  !*** ./src/app/admin/admin-acl-management/admin-acl-management.component.css ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/admin/admin-acl-management/admin-acl-management.component.html":
/*!********************************************************************************!*\
  !*** ./src/app/admin/admin-acl-management/admin-acl-management.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <div class=\"row bg-white\">\n        <div class=\"col\">\n            <div class=\"row\">\n                <div class=\"col\">\n                    <a [routerLink]=\"['/_admin/dashboard']\">Back to Dashboard</a>\n                </div>\n            </div>\n            <div class=\"row m-2\">\n                <div class=\"col\">\n                    <h2>Admin Management</h2>\n                </div>\n            </div>\n            <!-- <div class=\"row m-2\">\n                <div class=\"col\">\n                    <h4>Filter by name:</h4>\n                </div>\n            </div> -->\n            <div class=\"row\">\n                <div class=\"col\">\n                </div>\n                <div class=\"col-5\">\n                    <mat-form-field class=\"mat-FullWidth\">\n                        <input matInput placeholder=\"Filter by name\" [(ngModel)]=\"filterName\" (ngModelChange)=\"filterUsers(filterName)\">\n                    </mat-form-field>\n                </div>\n                <div class=\"col\">\n                </div>\n            </div>\n            <mat-paginator [length]=\"length\" [pageSize]=\"pageSize\" (page)=\"pageEventHandler($event)\">\n\n            </mat-paginator>\n            <table class=\"table table-striped\">\n                <thead>\n                    <tr>\n                        <th scope=\"col\">User Name:</th>\n                        <th scope=\"col\">Current Admin Rights:</th>\n                        <th scope=\"col\">Edit</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr *ngFor=\"let user of displayArray\">\n                        <td>{{user.displayName}}</td>\n                        <td>\n                            <div class=\"row\" *ngFor=\"let acl of user.adminRights | keyvalue\">\n                                <div class=\"col\">\n                                    {{acl.key}} : {{acl.value}}\n                                </div>\n                            </div>\n                        </td>\n                        <td><a [routerLink]=\"[user._id]\" class=\"btn btn-success\">Edit</a></td>\n                    </tr>\n                </tbody>\n            </table>\n            <!-- <div class=\"row\">\n                <div class=\"col\">\n                    <div class=\"row\">\n                        <div class=\"col\">\n                            \n                        </div>\n                        <div class=\"col\">\n                            <div class=\"row\">\n                                <div class=\"col\">\n                                    \n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col\"></div>\n                    </div>\n                </div>\n            </div> -->\n            <!-- <div class=\"row\">\n                <div class=\"col\">\n                    <div class=\"row\" *ngFor=\"let user of users\">\n                        <div class=\"col\">\n                            {{user.displayName}}\n                        </div>\n                        <div class=\"col\">\n                            \n                        </div>\n                        <div class=\"col\">\n                            <a [routerLink]=\"[user._id]\" class=\"btn btn-success\">Edit</a>\n                        </div>\n                    </div>\n                </div>\n            </div> -->\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/admin/admin-acl-management/admin-acl-management.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/admin/admin-acl-management/admin-acl-management.component.ts ***!
  \******************************************************************************/
/*! exports provided: AdminAclManagementComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminAclManagementComponent", function() { return AdminAclManagementComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var _acl_service_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./acl-service.service */ "./src/app/admin/admin-acl-management/acl-service.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AdminAclManagementComponent = /** @class */ (function () {
    function AdminAclManagementComponent(adminService, aclService) {
        this.adminService = adminService;
        this.aclService = aclService;
        //component properties
        this.users = [];
        this.filterName = '';
        this.displayArray = [];
        this.pageSize = 10;
        this.filteredArray = [];
    }
    AdminAclManagementComponent.prototype.pageEventHandler = function (pageEvent) {
        var i = pageEvent.pageIndex * this.pageSize;
        var endSlice = i + this.pageSize;
        if (endSlice > this.filteredArray.length) {
            endSlice = this.filteredArray.length;
        }
        this.displayArray = [];
        this.displayArray = this.filteredArray.slice(i, endSlice);
    };
    AdminAclManagementComponent.prototype.ngAfterViewInit = function () {
        this.paginator.pageIndex = 0;
    };
    AdminAclManagementComponent.prototype.filterUsers = function (filterName) {
        var _this = this;
        if (filterName == null || filterName == undefined || filterName.length == 0) {
            this.filteredArray = this.users;
            this.length = this.filteredArray.length;
            this.displayArray = this.filteredArray.slice(0, 10);
            this.paginator.firstPage();
        }
        else {
            this.filteredArray = [];
            this.users.forEach(function (element) {
                if (element.displayName.toLowerCase().indexOf(filterName.toLowerCase()) > -1) {
                    _this.filteredArray.push(element);
                }
            });
            this.length = this.filteredArray.length;
            this.displayArray = this.filteredArray.slice(0, 10);
            this.paginator.firstPage();
        }
    };
    AdminAclManagementComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.adminService.getUsersAcls().subscribe(function (res) {
            //assign return to local property
            _this.users = res;
            _this.users.forEach(function (element) {
                element = _this.aclService.removeUnwantedProps(element);
            });
            _this.filterUsers('');
        }, function (err) { console.log(err); });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatPaginator"])
    ], AdminAclManagementComponent.prototype, "paginator", void 0);
    AdminAclManagementComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-admin-acl-management',
            template: __webpack_require__(/*! ./admin-acl-management.component.html */ "./src/app/admin/admin-acl-management/admin-acl-management.component.html"),
            styles: [__webpack_require__(/*! ./admin-acl-management.component.css */ "./src/app/admin/admin-acl-management/admin-acl-management.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_1__["AdminService"], _acl_service_service__WEBPACK_IMPORTED_MODULE_2__["AclServiceService"]])
    ], AdminAclManagementComponent);
    return AdminAclManagementComponent;
}());



/***/ }),

/***/ "./src/app/admin/admin-acl-management/update-roles/update-roles.component.css":
/*!************************************************************************************!*\
  !*** ./src/app/admin/admin-acl-management/update-roles/update-roles.component.css ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/admin/admin-acl-management/update-roles/update-roles.component.html":
/*!*************************************************************************************!*\
  !*** ./src/app/admin/admin-acl-management/update-roles/update-roles.component.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <div class=\"row\">\n        <div class=\"col\">\n            <div class=\"row\">\n                <div class=\"col\">\n                    <a [routerLink]=\"['/_admin/userACLMgmt']\">&lt; Back</a>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col\">\n                    <h3>Edit User Rights:</h3>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col\">User:</div>\n                <div class=\"col\">Roles</div>\n            </div>\n\n            <div class=\"row\">\n                <div class=\"col\">\n                    {{user.displayName}}\n                </div>\n                <div class=\"col\">\n                    <div class=\"row\" *ngFor=\"let acl of rights\">\n                        <div class=\"col\">\n                            <mat-checkbox [(ngModel)]=\"acl.value\">{{acl.key}}</mat-checkbox>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col\">\n                    <button (click)=\"updateUserRights()\" class=\"btn btn-success\">Update Users Admin Roles</button>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/admin/admin-acl-management/update-roles/update-roles.component.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/admin/admin-acl-management/update-roles/update-roles.component.ts ***!
  \***********************************************************************************/
/*! exports provided: UpdateRolesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateRolesComponent", function() { return UpdateRolesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _acl_service_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../acl-service.service */ "./src/app/admin/admin-acl-management/acl-service.service.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UpdateRolesComponent = /** @class */ (function () {
    function UpdateRolesComponent(adminService, route, router, aclSerive) {
        this.adminService = adminService;
        this.route = route;
        this.router = router;
        this.aclSerive = aclSerive;
        this.user = {
            displayName: '',
            adminRights: {}
        }; //prototype user object
        //get id from route
        if (this.route.snapshot.params['id']) {
            this.recId = this.route.snapshot.params['id'];
        }
    }
    UpdateRolesComponent.prototype.ngOnInit = function () {
        var _this = this;
        //assign rights from the service to the local var
        this.rights = Object(lodash__WEBPACK_IMPORTED_MODULE_4__["cloneDeep"])(this.aclSerive.rights);
        //get the users ACLs provided in the route
        this.adminService.getUserAcls(this.recId).subscribe(function (res) {
            res = _this.aclSerive.removeUnwantedProps(res);
            console.log('res ', res);
            if (res.adminRights != null || res.adminRights != undefined) {
                var key = Object.keys(res.adminRights);
                key.forEach(function (element) {
                    _this.rights.forEach(function (statRight) {
                        if (element == statRight.key) {
                            statRight.value = true;
                        }
                    });
                });
            }
            else {
                res.adminRights = {};
                // this.rights.forEach((statRight) => {
                //     console.log(statRight);
                //   });
            }
            _this.user = res;
        }, function (err) {
            console.log(err);
        });
    };
    //updates the user rights
    UpdateRolesComponent.prototype.updateUserRights = function () {
        var _this = this;
        var resultantACL = {};
        this.rights.forEach(function (right) {
            if (right.value) {
                resultantACL[right.key] = right.value;
            }
        });
        resultantACL['adminId'] = this.user['_id'];
        this.adminService.upsertUserAcls(resultantACL).subscribe(function (res) {
            _this.router.navigate(['/_admin/userACLMgmt']);
        }, function (err) {
            console.log(err);
        });
    };
    UpdateRolesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-update-roles',
            template: __webpack_require__(/*! ./update-roles.component.html */ "./src/app/admin/admin-acl-management/update-roles/update-roles.component.html"),
            styles: [__webpack_require__(/*! ./update-roles.component.css */ "./src/app/admin/admin-acl-management/update-roles/update-roles.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_1__["AdminService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _acl_service_service__WEBPACK_IMPORTED_MODULE_3__["AclServiceService"]])
    ], UpdateRolesComponent);
    return UpdateRolesComponent;
}());



/***/ }),

/***/ "./src/app/admin/approve-member/approve-member-view/approve-member-view.component.css":
/*!********************************************************************************************!*\
  !*** ./src/app/admin/approve-member/approve-member-view/approve-member-view.component.css ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".row-style {\n    padding: 10px;\n    margin-top: 5px;\n    border-bottom: 1px solid #9a9898;\n}"

/***/ }),

/***/ "./src/app/admin/approve-member/approve-member-view/approve-member-view.component.html":
/*!*********************************************************************************************!*\
  !*** ./src/app/admin/approve-member/approve-member-view/approve-member-view.component.html ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row row-style\">\n    <div class=\"col\">\n        <app-user-quick-view [userId]=\"player\"></app-user-quick-view>\n    </div>\n    <div class=\"col\">\n        <app-team-quick-view [teamName]=\"viewTeam\"></app-team-quick-view>\n    </div>\n    <div class=\"col\">\n        {{resultantMmr}}\n    </div>\n    <div class=\"col\">\n        <div class=\"text-center\">\n            <button class=\"btn btn-success\" (click)=\"actionAccount(true)\">Approve</button>\n            <button class=\"btn btn-danger ml-1\" (click)=\"actionAccount(false)\">Deny</button>\n        </div>\n\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/admin/approve-member/approve-member-view/approve-member-view.component.ts":
/*!*******************************************************************************************!*\
  !*** ./src/app/admin/approve-member/approve-member-view/approve-member-view.component.ts ***!
  \*******************************************************************************************/
/*! exports provided: ApproveMemberViewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApproveMemberViewComponent", function() { return ApproveMemberViewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var src_app_services_team_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/team.service */ "./src/app/services/team.service.ts");
/* harmony import */ var _classes_profile_class__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../classes/profile.class */ "./src/app/classes/profile.class.ts");
/* harmony import */ var _classes_team_class__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../classes/team.class */ "./src/app/classes/team.class.ts");
/* harmony import */ var _services_admin_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/admin.service */ "./src/app/services/admin.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ApproveMemberViewComponent = /** @class */ (function () {
    function ApproveMemberViewComponent(user, team, admin) {
        this.user = user;
        this.team = team;
        this.admin = admin;
        //component properties
        this.player = new _classes_profile_class__WEBPACK_IMPORTED_MODULE_3__["Profile"](null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null); //local user profile - blank user profile
        this.viewTeam = new _classes_team_class__WEBPACK_IMPORTED_MODULE_4__["Team"](null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null); //local team profile - blank team profile
        //Output bindings
        this.accountActioned = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    Object.defineProperty(ApproveMemberViewComponent.prototype, "info", {
        //Input bindings , object that has username and teamname
        set: function (info) {
            if (info != null && info != undefined) {
                this._info = info;
            }
        },
        enumerable: true,
        configurable: true
    });
    //sends events to accountActioned output binding
    ApproveMemberViewComponent.prototype.accountActioner = function () {
        this.accountActioned.emit(this._info);
    };
    //grabs appropriate team and user information based on privided input binding
    ApproveMemberViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this._info.teamName && this._info.userName) {
            this.user.getUser(this._info.userName).subscribe(function (res) {
                _this.player = res;
            });
            this.team.getTeam(this._info.teamName).subscribe(function (resT) {
                _this.viewTeam = resT;
                _this.admin.resultantMmr(_this.player.averageMmr, _this.viewTeam.teamName_lower).subscribe(function (resmmr) {
                    _this.resultantMmr = resmmr.resultantMmr;
                }, function (err) {
                    console.log(err);
                });
            });
        }
    };
    //handles the approval chosen by the admin
    ApproveMemberViewComponent.prototype.actionAccount = function (act) {
        var _this = this;
        this.admin.queuePost(this.viewTeam.teamName, this.player.displayName, act).subscribe(function (res) {
            _this.accountActioner();
        }, function (err) {
            console.log(err);
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ApproveMemberViewComponent.prototype, "info", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], ApproveMemberViewComponent.prototype, "accountActioned", void 0);
    ApproveMemberViewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-approve-member-view',
            template: __webpack_require__(/*! ./approve-member-view.component.html */ "./src/app/admin/approve-member/approve-member-view/approve-member-view.component.html"),
            styles: [__webpack_require__(/*! ./approve-member-view.component.css */ "./src/app/admin/approve-member/approve-member-view/approve-member-view.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_services_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"], src_app_services_team_service__WEBPACK_IMPORTED_MODULE_2__["TeamService"], _services_admin_service__WEBPACK_IMPORTED_MODULE_5__["AdminService"]])
    ], ApproveMemberViewComponent);
    return ApproveMemberViewComponent;
}());



/***/ }),

/***/ "./src/app/admin/approve-member/approve-member.component.css":
/*!*******************************************************************!*\
  !*** ./src/app/admin/approve-member/approve-member.component.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".header-style {\n    padding: 10px;\n    background-color: #e0d4d4;\n    border-bottom: 1px solid #9a9898;\n}"

/***/ }),

/***/ "./src/app/admin/approve-member/approve-member.component.html":
/*!********************************************************************!*\
  !*** ./src/app/admin/approve-member/approve-member.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container pt-4\">\n    <div class=\"row\">\n        <div class=\"col\">\n            <a [routerLink]=\"['/_admin/dashboard']\">Back to Dashboard</a>\n        </div>\n    </div>\n    <div class=\"row header-style\">\n        <div class=\"col\">\n            Player\n        </div>\n        <div class=\"col\">\n            Team\n        </div>\n        <div class=\"col\">\n            Resultant MMR\n        </div>\n        <div class=\"col text-center\">\n            Actions\n        </div>\n    </div>\n    <div *ngFor=\"let queueItem of queue\">\n        <app-approve-member-view [info]=\"queueItem\" (accountActioned)=\"updateView($event)\"></app-approve-member-view>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/admin/approve-member/approve-member.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/admin/approve-member/approve-member.component.ts ***!
  \******************************************************************/
/*! exports provided: ApproveMemberComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApproveMemberComponent", function() { return ApproveMemberComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_queues_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/queues.service */ "./src/app/services/queues.service.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ApproveMemberComponent = /** @class */ (function () {
    function ApproveMemberComponent(queueService) {
        this.queueService = queueService;
    }
    ApproveMemberComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.queueService.getQueues('pendingMemberQueue').subscribe(function (res) {
            _this.queue = res;
        });
    };
    //removes an item from the view if it has been actioned
    ApproveMemberComponent.prototype.updateView = function (item) {
        var index = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["findIndex"])(this.queue, item);
        if (index > -1) {
            this.queue.splice(index, 1);
        }
    };
    ApproveMemberComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-approve-member',
            template: __webpack_require__(/*! ./approve-member.component.html */ "./src/app/admin/approve-member/approve-member.component.html"),
            styles: [__webpack_require__(/*! ./approve-member.component.css */ "./src/app/admin/approve-member/approve-member.component.css")]
        }),
        __metadata("design:paramtypes", [_services_queues_service__WEBPACK_IMPORTED_MODULE_1__["QueuesService"]])
    ], ApproveMemberComponent);
    return ApproveMemberComponent;
}());



/***/ }),

/***/ "./src/app/admin/approve-member/team-quick-view/team-quick-view.component.css":
/*!************************************************************************************!*\
  !*** ./src/app/admin/approve-member/team-quick-view/team-quick-view.component.css ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/admin/approve-member/team-quick-view/team-quick-view.component.html":
/*!*************************************************************************************!*\
  !*** ./src/app/admin/approve-member/team-quick-view/team-quick-view.component.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col\">\n        <div class=\"row\">\n            <div class=\"col\">\n                Name: {{disTeam.teamName}}\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col\">\n                Average MMR: {{disTeam.teamMMRAvg}}\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/admin/approve-member/team-quick-view/team-quick-view.component.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/admin/approve-member/team-quick-view/team-quick-view.component.ts ***!
  \***********************************************************************************/
/*! exports provided: TeamQuickViewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeamQuickViewComponent", function() { return TeamQuickViewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_team_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../services/team.service */ "./src/app/services/team.service.ts");
/* harmony import */ var _classes_team_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../classes/team.class */ "./src/app/classes/team.class.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TeamQuickViewComponent = /** @class */ (function () {
    function TeamQuickViewComponent(team) {
        this.team = team;
        this.disTeam = new _classes_team_class__WEBPACK_IMPORTED_MODULE_2__["Team"](null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    }
    Object.defineProperty(TeamQuickViewComponent.prototype, "teamName", {
        //Input bindings
        set: function (team) {
            if (team != undefined && team != null) {
                this.disTeam = team;
            }
        },
        enumerable: true,
        configurable: true
    });
    TeamQuickViewComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], TeamQuickViewComponent.prototype, "teamName", null);
    TeamQuickViewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-team-quick-view',
            template: __webpack_require__(/*! ./team-quick-view.component.html */ "./src/app/admin/approve-member/team-quick-view/team-quick-view.component.html"),
            styles: [__webpack_require__(/*! ./team-quick-view.component.css */ "./src/app/admin/approve-member/team-quick-view/team-quick-view.component.css")]
        }),
        __metadata("design:paramtypes", [_services_team_service__WEBPACK_IMPORTED_MODULE_1__["TeamService"]])
    ], TeamQuickViewComponent);
    return TeamQuickViewComponent;
}());



/***/ }),

/***/ "./src/app/admin/approve-member/user-quick-view/user-quick-view.component.css":
/*!************************************************************************************!*\
  !*** ./src/app/admin/approve-member/user-quick-view/user-quick-view.component.css ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/admin/approve-member/user-quick-view/user-quick-view.component.html":
/*!*************************************************************************************!*\
  !*** ./src/app/admin/approve-member/user-quick-view/user-quick-view.component.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col\">\n        <div class=\"row\">\n            <div class=\"col\">\n                Name: {{player.displayName}}\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col\">\n                <div *ngIf=\"player.averageMmr; else noMmr\">MMR: {{player.averageMmr}}</div>\n\n            </div>\n            <ng-template #noMmr>\n                MMR: Player has not updated profile with hots logs URL, please contact them!\n            </ng-template>\n        </div>\n        <div class=\"row\">\n            <div class=\"col\">\n                <div *ngIf=\"player.hlRankMetal && player.hlRankDivision; else noMetalDiv\">\n                    Hero League: {{player.hlRankMetal}} - {{player.hlRankDivision}}\n                </div>\n                <ng-template #noMetalDiv>\n                    Player has not recorded an ingame metal/div in their profole, please contact them!\n                </ng-template>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/admin/approve-member/user-quick-view/user-quick-view.component.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/admin/approve-member/user-quick-view/user-quick-view.component.ts ***!
  \***********************************************************************************/
/*! exports provided: UserQuickViewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserQuickViewComponent", function() { return UserQuickViewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _classes_profile_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../classes/profile.class */ "./src/app/classes/profile.class.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserQuickViewComponent = /** @class */ (function () {
    function UserQuickViewComponent(user) {
        this.user = user;
        this.player = new _classes_profile_class__WEBPACK_IMPORTED_MODULE_2__["Profile"](null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    }
    Object.defineProperty(UserQuickViewComponent.prototype, "userId", {
        //input bindings
        set: function (usr) {
            if (usr != null && usr != undefined) {
                this.player = usr;
            }
        },
        enumerable: true,
        configurable: true
    });
    UserQuickViewComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], UserQuickViewComponent.prototype, "userId", null);
    UserQuickViewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-user-quick-view',
            template: __webpack_require__(/*! ./user-quick-view.component.html */ "./src/app/admin/approve-member/user-quick-view/user-quick-view.component.html"),
            styles: [__webpack_require__(/*! ./user-quick-view.component.css */ "./src/app/admin/approve-member/user-quick-view/user-quick-view.component.css")]
        }),
        __metadata("design:paramtypes", [_services_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"]])
    ], UserQuickViewComponent);
    return UserQuickViewComponent;
}());



/***/ }),

/***/ "./src/app/admin/dashboard/dashboard.component.css":
/*!*********************************************************!*\
  !*** ./src/app/admin/dashboard/dashboard.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".link-borders {\n    border-right: solid;\n    padding-right: 10px;\n}\n\nul {\n    list-style-type: none;\n    margin: 0;\n    padding: 0;\n}"

/***/ }),

/***/ "./src/app/admin/dashboard/dashboard.component.html":
/*!**********************************************************!*\
  !*** ./src/app/admin/dashboard/dashboard.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <div class=\"forceFull\">\n        <div class=\"row\">\n            <div class=\"col text-center\">\n                <h2>Admin dashboard</h2>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col text-center\">\n                <ul>\n                    <li class=\"mt-1\">\n                        <a [routerLink]=\"['/_admin/approveTeamQueue']\">Add User To Team</a>\n                    </li>\n                    <li class=\"mt-1\">\n                        <a [routerLink]=\"['/_admin/deleteUser']\">Delete User</a>\n                    </li>\n                    <li class=\"mt-1\">\n                        <a [routerLink]=\"['/_admin/divisionMgmt']\">Division Management</a>\n                    </li>\n                    <li class=\"mt-1\">\n                        <a [routerLink]=\"['/_admin/manageTeam']\">Team Management</a>\n                    </li>\n                    <li class=\"mt-1\">\n                        <a [routerLink]=\"['/_admin/matchMgmt']\">Match Management</a>\n                    </li>\n                    <li class=\"mt-1\">\n                        <a [routerLink]=\"['/_admin/matchMgmt/weekDeadline']\">Match Schedule Deadline Setter</a>\n                    </li>\n                    <li class=\"mt-1\">\n                        <a [routerLink]=\"['/_admin/userACLMgmt']\">User ACL Management</a>\n                    </li>\n                </ul>\n                <!-- <h3>User Management</h3> -->\n            </div>\n        </div>\n        <!-- <div class=\"row\">\n        <div class=\"col\">\n            <h3>Division Management</h3>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col\">\n            <h3>Team Management</h3>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col\">\n            <h2>User ACL Management</h2>\n        </div>\n    </div> -->\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/admin/dashboard/dashboard.component.ts":
/*!********************************************************!*\
  !*** ./src/app/admin/dashboard/dashboard.component.ts ***!
  \********************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DashboardComponent = /** @class */ (function () {
    function DashboardComponent() {
    }
    DashboardComponent.prototype.ngOnInit = function () {
    };
    DashboardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__(/*! ./dashboard.component.html */ "./src/app/admin/dashboard/dashboard.component.html"),
            styles: [__webpack_require__(/*! ./dashboard.component.css */ "./src/app/admin/dashboard/dashboard.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./src/app/admin/delete-member/delete-member.component.css":
/*!*****************************************************************!*\
  !*** ./src/app/admin/delete-member/delete-member.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".icon-align {\n    display: inline-flex;\n    vertical-align: middle;\n}"

/***/ }),

/***/ "./src/app/admin/delete-member/delete-member.component.html":
/*!******************************************************************!*\
  !*** ./src/app/admin/delete-member/delete-member.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container pt-4\">\n\n    <div class=\"row\">\n        <div class=\"col\">\n            <a [routerLink]=\"['/_admin/dashboard']\">Back to Dashboard</a>\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col\">\n            <app-user-search (userSelected)=\"receiveUser($event)\" [buttonText]=\"'Select User For Delete'\"></app-user-search>\n        </div>\n        <div class=\"col\">\n            <div class=\"row\" *ngIf=\"turnOnForm\">\n                <div class=\"col\">Review user below</div>\n                <div class=\"col\">\n                    <button type=\"button\" (click)=\"openDialog()\" class=\"btn btn-danger \">\n                            <span class=\"icon-align\">\n                              <i class=\"material-icons\">delete_forever</i> Delete\n                            </span>\n                          </button>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"row\" *ngIf=\"turnOnForm\">\n        <div class=\"col\">\n            <app-profile-edit [passedProfile]=\"recievedProfile\"></app-profile-edit>\n        </div>\n    </div>"

/***/ }),

/***/ "./src/app/admin/delete-member/delete-member.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/admin/delete-member/delete-member.component.ts ***!
  \****************************************************************/
/*! exports provided: DeleteMemberComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeleteMemberComponent", function() { return DeleteMemberComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _modal_delete_confrim_modal_delete_confrim_modal_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../modal/delete-confrim-modal/delete-confrim-modal.component */ "./src/app/modal/delete-confrim-modal/delete-confrim-modal.component.ts");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DeleteMemberComponent = /** @class */ (function () {
    function DeleteMemberComponent(dialog, admin) {
        this.dialog = dialog;
        this.admin = admin;
        this.turnOnForm = false;
    }
    //functon bound to the user search event, when user is returned turn on the view to see the selected user profile
    DeleteMemberComponent.prototype.receiveUser = function (userRec) {
        this.turnOnForm = false;
        if (userRec != null && userRec != undefined) {
            this.turnOnForm = true;
            this.recievedProfile = userRec;
        }
    };
    //methods for opening the modal
    DeleteMemberComponent.prototype.openDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(_modal_delete_confrim_modal_delete_confrim_modal_component__WEBPACK_IMPORTED_MODULE_2__["DeleteConfrimModalComponent"], {
            width: '300px',
            data: { confirm: this.confirm }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result.toLowerCase() == 'delete') {
                _this.admin.deleteUser(_this.recievedProfile).subscribe(function (res) {
                    _this.turnOnForm = false;
                    _this.recievedProfile = null;
                }, function (err) {
                    console.log(err);
                });
            }
        });
    };
    DeleteMemberComponent.prototype.ngOnInit = function () {
    };
    DeleteMemberComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-delete-member',
            template: __webpack_require__(/*! ./delete-member.component.html */ "./src/app/admin/delete-member/delete-member.component.html"),
            styles: [__webpack_require__(/*! ./delete-member.component.css */ "./src/app/admin/delete-member/delete-member.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"], src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_3__["AdminService"]])
    ], DeleteMemberComponent);
    return DeleteMemberComponent;
}());



/***/ }),

/***/ "./src/app/admin/division-management/add-team/add-team.component.css":
/*!***************************************************************************!*\
  !*** ./src/app/admin/division-management/add-team/add-team.component.css ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".underline {\n    border-bottom-style: solid;\n}"

/***/ }),

/***/ "./src/app/admin/division-management/add-team/add-team.component.html":
/*!****************************************************************************!*\
  !*** ./src/app/admin/division-management/add-team/add-team.component.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"containter pt-4\">\n    <div class=\"row\">\n        <div class=\"col\">\n\n\n            <div class=\"row border border-dark rounded mb-3 p-2\" *ngIf='selectedTeams.length>0 && selectedDiv'>\n                <div class=\"col\">\n                    <h5>Confirmation:</h5>\n                    <div class=\"row\">\n                        <div class=\"col\">\n                            Adding teams:\n                            <div *ngFor=\"let team of selectedTeams; let i = index\">{{team.teamName}}</div>\n                        </div>\n                        <div class=\"col\">\n                            to Division:\n                            <div>{{selectedDiv.displayName}}</div>\n                        </div>\n                        <div class=\"col-2\">\n                            <button type=\"button\" class=\"btn btn-success\" (click)=\"divisionTeams()\">Confirm</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"row bg-secondary border border-dark text-white p-2\">\n                <div class=\"col\">\n                    <div class=\"row\">\n                        <div class=\"col\">\n                            <span>\n              <h5>Teams:</h5>\n            </span>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col\">\n                            Team Name:\n                        </div>\n                        <div class=\"col\">\n                            Team MMR:\n                        </div>\n                    </div>\n                </div>\n                <div class=\"col\">\n                    <div class=\"row\">\n                        <div class=\"col\">\n                            <span>\n              <h5>Divisions:</h5>\n            </span>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col\">\n                            Division Name:\n                        </div>\n                        <div class=\"col\">\n                            Division MMR Bracket:\n                        </div>\n                    </div>\n                </div>\n\n            </div>\n            <div class=\"row\">\n                <div class=\"col\">\n                    <div class=\"row p-2\" style=\"border-style: solid\" [ngClass]=\"{'border border-info bg-info text-white': isSelected(team)}\" *ngFor=\"let team of undivisionTeams\">\n                        <div class=\"col\">\n                            <div class=\"row\">\n                                <div class=\"col\">\n                                    <div><strong>Team Name</strong></div>\n                                    {{team.teamName}}\n                                </div>\n                                <div class=\"col-2\">\n                                    <div><strong>Team MMR:</strong></div>\n                                    {{team.teamMMRAvg}}\n                                </div>\n                                <div class=\"col\">\n                                    <a class=\"finger underline\" (click)=\"teamSelected(team)\">Click to <span *ngIf=\"isSelected(team) else select\"> deselect </span>\n                                        <ng-template #select>select</ng-template> team\n                                    </a>\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col\">\n                                    <div><strong>Preferred Coast</strong></div>\n                                    {{team.questionnaire.eastWest}}\n                                </div>\n                                <div class=\"col\">\n                                    <div><strong><a target=\"_blank\" [routerLink]=\"['/_admin/manageTeam/', teamService.routeFriendlyTeamName(team.teamName)]\">Team Profile</a></strong></div>\n                                </div>\n                            </div>\n                        </div>\n\n\n\n                    </div>\n                </div>\n                <div class=\"col\">\n                    <div class=\"row finger p-2\" [ngClass]=\"{'border border-warning bg-warning text-dark': isDivSelected(division)}\" *ngFor=\"let division of divisions\">\n                        <div class=\"col\">\n                            {{division.displayName}}\n                        </div>\n                        <div class=\"col\">\n                            <div>Max MMR: {{division.maxMMR}}</div>\n                            <div>Min MMR: {{division.minMMR}}</div>\n                        </div>\n                        <div class=\"col\">\n                            <a class=\"finger underline\" (click)=\"divSelected(division)\">Click to Select Division</a>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/admin/division-management/add-team/add-team.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/admin/division-management/add-team/add-team.component.ts ***!
  \**************************************************************************/
/*! exports provided: AddTeamComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddTeamComponent", function() { return AddTeamComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_team_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/team.service */ "./src/app/services/team.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AddTeamComponent = /** @class */ (function () {
    function AddTeamComponent(admin, router, teamService) {
        this.admin = admin;
        this.router = router;
        this.teamService = teamService;
        this.selectedTeams = []; //local variable holds the selected teams to assign to a division
    }
    AddTeamComponent.prototype.ngOnInit = function () {
        var _this = this;
        //set the local vars to empty / uninitialised 
        this.selectedTeams = [];
        this.selectedDiv = undefined;
        this.undivisionTeams = [];
        //get teams and divisions
        this.admin.getTeamsNotDivisioned().subscribe(function (res) {
            _this.undivisionTeams = res;
            _this.undivisionTeams = _this.undivisionTeams.sort(function (a, b) {
                if (a.teamMMRAvg < b.teamMMRAvg) {
                    return -1;
                }
                if (a.teamMMRAvg > b.teamMMRAvg) {
                    return 1;
                }
                return 0;
            });
        }, function (err) {
            console.log(err);
        });
        this.divisions = [];
        this.admin.getDivisionList().subscribe(function (res) {
            _this.divisions = res;
        }, function (err) {
            console.log(err);
        });
    };
    //method accepts team name and toggles it's inclusion in the array of teams to be added
    AddTeamComponent.prototype.teamSelected = function (team) {
        //if team is in the array, remove and deactivate it
        var index = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["indexOf"])(this.selectedTeams, team);
        if (index > -1) {
            this.selectedTeams.splice(index, 1);
        }
        else {
            this.selectedTeams.push(team);
        }
    };
    //sets the selected division variable
    AddTeamComponent.prototype.divSelected = function (div) {
        this.selectedDiv = div;
    };
    //method for selective styling of team elements, returns true if team is in the selectedArray ,false if not
    AddTeamComponent.prototype.isSelected = function (team) {
        var index = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["indexOf"])(this.selectedTeams, team);
        if (index > -1) {
            return true;
        }
        else {
            return false;
        }
    };
    //method for selectinve styling of the division element, returns true if div is the selectedDiv, false if not
    AddTeamComponent.prototype.isDivSelected = function (div) {
        if (this.selectedDiv == div) {
            return true;
        }
        else {
            return false;
        }
    };
    //method to handle assigning selected teams to selected division
    AddTeamComponent.prototype.divisionTeams = function () {
        var _this = this;
        this.admin.divisionTeam(this.selectedTeams, this.selectedDiv.divisionConcat).subscribe(function (res) {
            _this.ngOnInit();
        }, function (err) {
            console.log(err);
        });
    };
    AddTeamComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-add-team',
            template: __webpack_require__(/*! ./add-team.component.html */ "./src/app/admin/division-management/add-team/add-team.component.html"),
            styles: [__webpack_require__(/*! ./add-team.component.css */ "./src/app/admin/division-management/add-team/add-team.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_1__["AdminService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], src_app_services_team_service__WEBPACK_IMPORTED_MODULE_4__["TeamService"]])
    ], AddTeamComponent);
    return AddTeamComponent;
}());



/***/ }),

/***/ "./src/app/admin/division-management/division-management.component.css":
/*!*****************************************************************************!*\
  !*** ./src/app/admin/division-management/division-management.component.css ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".finger:hover {\n    background-color: darkgray;\n    border-style: solid;\n    border-color: black;\n    border-width: 1px;\n}\n\n.fullHeight {\n    height: 100%;\n}\n\n#tab-group mat-tab-body {\n    flex-grow: 1;\n}\n\n.mat-tab-body-wrapper {\n    height: 100%;\n}"

/***/ }),

/***/ "./src/app/admin/division-management/division-management.component.html":
/*!******************************************************************************!*\
  !*** ./src/app/admin/division-management/division-management.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container fullHeight\">\n    <div class=\"row\">\n        <div class=\"col\">\n            <a [routerLink]=\"['/_admin/dashboard']\">Back to Dashboard</a>\n        </div>\n    </div>\n    <div class=\"row forceFull\">\n        <div class=\"col\">\n            <mat-tab-group dynamicHeight class=\"fullHeight\">\n                <mat-tab label=\"Add Teams To Division\">\n                    <ng-template matTabContent>\n                        <app-add-team></app-add-team>\n                    </ng-template>\n                </mat-tab>\n                <mat-tab label=\"Division Management\">\n                    <ng-template matTabContent>\n                        <app-division-props></app-division-props>\n                    </ng-template>\n                </mat-tab>\n                <mat-tab label=\"Remove Teams From Division\">\n                    <ng-template matTabContent>\n                        <app-remove-team></app-remove-team>\n                    </ng-template>\n                </mat-tab>\n            </mat-tab-group>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/admin/division-management/division-management.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/admin/division-management/division-management.component.ts ***!
  \****************************************************************************/
/*! exports provided: DivisionManagementComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DivisionManagementComponent", function() { return DivisionManagementComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DivisionManagementComponent = /** @class */ (function () {
    function DivisionManagementComponent() {
    }
    DivisionManagementComponent.prototype.ngOnInit = function () {
    };
    DivisionManagementComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-division-management',
            template: __webpack_require__(/*! ./division-management.component.html */ "./src/app/admin/division-management/division-management.component.html"),
            styles: [__webpack_require__(/*! ./division-management.component.css */ "./src/app/admin/division-management/division-management.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], DivisionManagementComponent);
    return DivisionManagementComponent;
}());



/***/ }),

/***/ "./src/app/admin/division-management/division-props/division-props.component.css":
/*!***************************************************************************************!*\
  !*** ./src/app/admin/division-management/division-props/division-props.component.css ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".example-container {\n    display: flex;\n    flex-direction: column;\n}\n\n.example-container>* {\n    width: 100%;\n}"

/***/ }),

/***/ "./src/app/admin/division-management/division-props/division-props.component.html":
/*!****************************************************************************************!*\
  !*** ./src/app/admin/division-management/division-props/division-props.component.html ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <div class=\"row\">\n        <div class=\"col\">\n            <div class=\"row\">\n                <div class=\"col\">\n                    <div class=\"example-container\">\n                        <h5>Select division to modify:</h5>\n                        <mat-form-field>\n                            <mat-select placeholder=\"Division:\" [(ngModel)]=\"selectedDivision\" (ngModelChange)=\"selected(selectedDivision)\" disableOptionCentering>\n                                <mat-option *ngFor=\"let division of divisions; let i = index\" [value]=\"division\">{{division.displayName}}</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                </div>\n                <div class=\"col\">\n                    <h5>Create new division</h5>\n                    <button (click)=\"createNew()\">Create new</button>\n                </div>\n            </div>\n\n            <div *ngIf=\"editDivision\">\n                <div class=\"row\">\n                    <div class=\"col\">\n                        <div class=\"example-container\">\n                            <mat-form-field>\n                                <input matInput placeholder=\"Display Name\" [formControl]=\"displayNameControl\" [(ngModel)]=\"editDivision.displayName\">\n                                <mat-error *ngIf=\"displayNameControl.hasError('required')\">\n                                    Display name is required\n                                </mat-error>\n                            </mat-form-field>\n                            <mat-form-field>\n                                <input matInput placeholder=\"Division Name\" [formControl]=\"divisionNameControl\" [(ngModel)]=\"editDivision.divisionName\" (ngModelChange)=\"calculateNewConcat()\">\n                                <mat-error *ngIf=\"divisionNameControl.hasError('required')\">\n                                    Division name is required\n                                </mat-error>\n                            </mat-form-field>\n                            <mat-form-field>\n                                <input matInput placeholder=\"Division Coast\" [(ngModel)]=\"editDivision.divisionCoast\" (ngModelChange)=\"calculateNewConcat()\">\n                            </mat-form-field>\n                            <mat-form-field>\n                                <input matInput placeholder=\"Division Concat (System Reference)\" [(ngModel)]=\"editDivision.divisionConcat\" disabled=\"true\">\n                            </mat-form-field>\n                            <mat-form-field>\n                                <input matInput placeholder=\"Sorting\" [(ngModel)]=\"editDivision.sorting\">\n                            </mat-form-field>\n                            <mat-form-field>\n                                <input matInput placeholder=\"Max MMR\" [formControl]=\"maxMMRControl\" [(ngModel)]=\"editDivision.maxMMR\">\n                                <mat-error *ngIf=\"maxMMRControl.hasError('required')\">\n                                    Max MMR is required\n                                </mat-error>\n                            </mat-form-field>\n                            <mat-form-field>\n                                <input matInput placeholder=\"Min MMR\" [formControl]=\"minMMRControl\" [(ngModel)]=\"editDivision.minMMR\">\n                                <mat-error *ngIf=\"minMMRControl.hasError('required')\">\n                                    Min MMR is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col\">\n                        <button class=\"btn btn-warning\" (click)=\"revert()\">Cancel Changes</button>\n                    </div>\n                    <div class=\"col\" *ngIf=\"!newDiv\">\n                        <button class=\"btn btn-danger\" (click)=\"delete(editDivision.divisionConcat)\">Delete Selected Division</button>\n                    </div>\n                    <div class=\"col\">\n                        <button class=\"btn btn-success\" [disabled]=\"!divisionForm.valid\" (click)=\"save(editDivision)\">Save</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/admin/division-management/division-props/division-props.component.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/admin/division-management/division-props/division-props.component.ts ***!
  \**************************************************************************************/
/*! exports provided: DivisionPropsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DivisionPropsComponent", function() { return DivisionPropsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _modal_delete_confrim_modal_delete_confrim_modal_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../modal/delete-confrim-modal/delete-confrim-modal.component */ "./src/app/modal/delete-confrim-modal/delete-confrim-modal.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DivisionPropsComponent = /** @class */ (function () {
    function DivisionPropsComponent(dialog, adminService) {
        this.dialog = dialog;
        this.adminService = adminService;
        //component properties
        this.newDiv = false;
        this.divisions = [];
        this.selectedDivision = null;
        this.displayNameControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]('', [
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required
        ]);
        this.divisionNameControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]('', [
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required
        ]);
        this.divisionCoastControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]('', [
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required
        ]);
        this.maxMMRControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]('', [
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required
        ]);
        this.minMMRControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]('', [
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required
        ]);
        this.divisionForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroup"]({
            displayName: this.displayNameControl,
            divName: this.divisionNameControl,
            maxMMR: this.maxMMRControl,
            minMMR: this.minMMRControl
        });
    }
    //creates a new concatinated system id from provided inputs
    DivisionPropsComponent.prototype.calculateNewConcat = function () {
        var div = this.editDivision.divisionName ? this.editDivision.divisionName.toLowerCase() : '';
        var coast = this.editDivision.divisionCoast ? this.editDivision.divisionCoast.toLowerCase() : '';
        this.editDivision.divisionConcat = div;
        if (coast.length > 0) {
            this.editDivision.divisionConcat = this.editDivision.divisionConcat + '-' + coast;
        }
        this.editDivision.divisionConcat = this.editDivision.divisionConcat.replace(/[^A-Z0-9\-]+/ig, "-");
    };
    //division selected from dropdown, creates a safe source to cancel back to
    DivisionPropsComponent.prototype.selected = function (div) {
        this.editDivision = Object.assign({}, this.selectedDivision);
        this.safeSource = Object.assign({}, this.selectedDivision);
    };
    //sets up an empty object to create a new division from
    DivisionPropsComponent.prototype.createNew = function () {
        this.newDiv = true;
        this.editDivision = Object.assign({});
    };
    DivisionPropsComponent.prototype.ngOnInit = function () {
        var _this = this;
        //gets division list
        this.adminService.getDivisionList().subscribe(function (res) {
            _this.divisions = res;
        }, function (err) {
            console.log(err);
        });
    };
    //reverts any changes to a dib object back to the safe source created at selection
    DivisionPropsComponent.prototype.revert = function () {
        if (this.newDiv) {
            this.editDivision = null;
        }
        this.editDivision = Object.assign({}, this.safeSource);
    };
    DivisionPropsComponent.prototype.delete = function (divConcat) {
        var _this = this;
        var dialogRef = this.dialog.open(_modal_delete_confrim_modal_delete_confrim_modal_component__WEBPACK_IMPORTED_MODULE_4__["DeleteConfrimModalComponent"], {
            width: '300px',
            data: { confirm: this.confirm }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result.toLowerCase() == 'delete') {
                _this.adminService.deleteDivision(divConcat).subscribe(function (res) {
                    _this.editDivision = null;
                    _this.ngOnInit();
                }, function (err) {
                    alert('Division was not deleted!');
                });
            }
        });
    };
    //handles the saving of edits to a division or the creation of a new division
    //resets the view on success
    DivisionPropsComponent.prototype.save = function () {
        var _this = this;
        if (this.newDiv) {
            this.adminService.createDivision(this.editDivision).subscribe(function (res) {
                _this.newDiv = false;
                _this.editDivision = null;
                _this.ngOnInit();
            }, function (err) {
                alert('Division not created');
            });
        }
        else {
            this.adminService.saveDivisionEdits(this.safeSource.divisionConcat, this.editDivision).subscribe(function (res) {
                _this.editDivision = null;
                _this.ngOnInit();
            }, function (err) {
                console.log(err);
            });
        }
    };
    DivisionPropsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-division-props',
            template: __webpack_require__(/*! ./division-props.component.html */ "./src/app/admin/division-management/division-props/division-props.component.html"),
            styles: [__webpack_require__(/*! ./division-props.component.css */ "./src/app/admin/division-management/division-props/division-props.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"], src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_2__["AdminService"]])
    ], DivisionPropsComponent);
    return DivisionPropsComponent;
}());



/***/ }),

/***/ "./src/app/admin/division-management/remove-team/remove-team.component.css":
/*!*********************************************************************************!*\
  !*** ./src/app/admin/division-management/remove-team/remove-team.component.css ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/admin/division-management/remove-team/remove-team.component.html":
/*!**********************************************************************************!*\
  !*** ./src/app/admin/division-management/remove-team/remove-team.component.html ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <div class=\"row\">\n        <div class=\"col\">\n            <div class=\"row\">\n                <div class=\"col\">\n                    <div>\n                        <h5>Select division to modify:</h5>\n                        <mat-form-field class=\"mat-FullWidth\">\n                            <mat-select placeholder=\"Division:\" [(ngModel)]=\"selectedDivision\" (ngModelChange)=\"selected()\" disableOptionCentering>\n                                <mat-option *ngFor=\"let division of divisions; let i = index\" [value]=\"division\">{{division.displayName}}</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                </div>\n            </div>\n            <div class=\"row\" *ngIf=\"selectedDiv\">\n                <div class=\"col\">\n                    <div class=\"row finger p-2\" [ngClass]=\"{'border border-info bg-info text-white': isSelected(team)}\" (click)=\"teamSelected(team)\" *ngFor=\"let team of selectedDiv.teams\">\n                        <div class=\"col\">\n                            {{team}}\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"row mt-2\">\n                <div class=\"col\">\n                    <button type=\"button\" (click)=\"removeTeams()\" class=\"btn btn-danger\">Remove Selected Teams</button>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/admin/division-management/remove-team/remove-team.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/admin/division-management/remove-team/remove-team.component.ts ***!
  \********************************************************************************/
/*! exports provided: RemoveTeamComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RemoveTeamComponent", function() { return RemoveTeamComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RemoveTeamComponent = /** @class */ (function () {
    function RemoveTeamComponent(adminService, router) {
        this.adminService = adminService;
        this.router = router;
        //component properties
        this.divisions = [];
        this.selectedDiv = null;
        this.selectedTeams = [];
    }
    RemoveTeamComponent.prototype.ngOnInit = function () {
        var _this = this;
        //grab division list for display
        this.adminService.getDivisionList().subscribe(function (res) {
            _this.divisions = res;
        }, function (err) {
            console.log(err);
        });
    };
    //Assings the local property selectedDiv to a copy of the division chose.
    RemoveTeamComponent.prototype.selected = function () {
        this.selectedDiv = Object.assign({}, this.selectedDivision);
    };
    //toggles provided team into or out of the selectedTeams array
    RemoveTeamComponent.prototype.teamSelected = function (team) {
        //if team is in the array, remove it
        var index = Object(lodash__WEBPACK_IMPORTED_MODULE_1__["indexOf"])(this.selectedTeams, team);
        if (index > -1) {
            this.selectedTeams.splice(index, 1);
        }
        else { //else push the team into the array
            this.selectedTeams.push(team);
        }
    };
    //function accepts team and returns true if it is in the selected array - conditional styling for view
    RemoveTeamComponent.prototype.isSelected = function (team) {
        var index = Object(lodash__WEBPACK_IMPORTED_MODULE_1__["indexOf"])(this.selectedTeams, team);
        if (index > -1) {
            return true;
        }
        else {
            return false;
        }
    };
    //calls the admin service to remove the selected teams from the selected divison
    RemoveTeamComponent.prototype.removeTeams = function () {
        var _this = this;
        this.adminService.removeTeams(this.selectedTeams, this.selectedDiv.divisionConcat).subscribe(function (res) {
            _this.selectedDiv = null;
            _this.selectedTeams = [];
        }, function (err) {
            console.log(err);
        });
    };
    RemoveTeamComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-remove-team',
            template: __webpack_require__(/*! ./remove-team.component.html */ "./src/app/admin/division-management/remove-team/remove-team.component.html"),
            styles: [__webpack_require__(/*! ./remove-team.component.css */ "./src/app/admin/division-management/remove-team/remove-team.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_2__["AdminService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], RemoveTeamComponent);
    return RemoveTeamComponent;
}());



/***/ }),

/***/ "./src/app/admin/logs-viewer/logs-viewer.component.css":
/*!*************************************************************!*\
  !*** ./src/app/admin/logs-viewer/logs-viewer.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/admin/logs-viewer/logs-viewer.component.html":
/*!**************************************************************!*\
  !*** ./src/app/admin/logs-viewer/logs-viewer.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  logs-viewer works!\n</p>\n"

/***/ }),

/***/ "./src/app/admin/logs-viewer/logs-viewer.component.ts":
/*!************************************************************!*\
  !*** ./src/app/admin/logs-viewer/logs-viewer.component.ts ***!
  \************************************************************/
/*! exports provided: LogsViewerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogsViewerComponent", function() { return LogsViewerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LogsViewerComponent = /** @class */ (function () {
    function LogsViewerComponent() {
    }
    LogsViewerComponent.prototype.ngOnInit = function () {
    };
    LogsViewerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-logs-viewer',
            template: __webpack_require__(/*! ./logs-viewer.component.html */ "./src/app/admin/logs-viewer/logs-viewer.component.html"),
            styles: [__webpack_require__(/*! ./logs-viewer.component.css */ "./src/app/admin/logs-viewer/logs-viewer.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], LogsViewerComponent);
    return LogsViewerComponent;
}());



/***/ }),

/***/ "./src/app/admin/manage-team/manage-select-team.component.css":
/*!********************************************************************!*\
  !*** ./src/app/admin/manage-team/manage-select-team.component.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".icon-align {\n    display: inline-flex;\n    vertical-align: middle;\n}\n\n.oddRow {\n    background-color: #e0e0eb\n}\n\n.rowBorder {\n    border-style: solid;\n    border-width: 1px;\n    border-color: lightgrey;\n}\n\n.titles {\n    font-weight: bold\n}"

/***/ }),

/***/ "./src/app/admin/manage-team/manage-select-team.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/admin/manage-team/manage-select-team.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container pt-4\">\n    <div class=\"\">\n        <div class=\"row bg-white\">\n            <div class=\"col\">\n                <div class=\"row\">\n                    <div class=\"col\">\n                        <a [routerLink]=\"['/_admin/dashboard']\">Back to Dashboard</a>\n                    </div>\n                </div>\n\n                <div class=\"row mt-3\">\n                    <div class=\"col\">\n                        <h3>Select from list:</h3>\n                    </div>\n                </div>\n\n                <div class=\"row\">\n                    <div class=\"col\">\n                        <mat-form-field class=\"mat-FullWidth\">\n                            <input matInput placeholder=\"Filter by name\" [(ngModel)]=\"filterName\" (ngModelChange)=\"filterTeams(filterName)\">\n                        </mat-form-field>\n                    </div>\n                </div>\n                <mat-paginator [length]=\"length\" [pageSize]=\"pageSize\" (page)=\"pageEventHandler($event)\">\n\n                </mat-paginator>\n                <div class=\"row mt-2 p-3 rowBorder\" *ngFor=\"let team of displayArray; let ind = index\" [ngClass]=\"{oddRow : ind%2!=0}\">\n                    <div class=\"col\">\n                        <div class=\"row\">\n                            <div class=\"col\">\n                                <span class=\"titles\">Team Name:</span> {{team.teamName}}\n                            </div>\n                            <div class=\"col\">\n                                <span class=\"titles\">Divison: </span> <i *ngIf=\"!team.divisionDisplayName\">(not assigned)</i>\n                                <span *ngIf=\"team.divisionDisplayName\">{{team.divisionDisplayName}}</span>\n                            </div>\n                            <div class=\"col\">\n                                <span class=\"titles\">Captain:</span> {{team.captain}}\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col\">\n                                <span class=\"titles\">Members:</span> {{team.teamMembers.length}}\n                            </div>\n                            <div class=\"col\">\n                                <span class=\"titles\">MMR:</span> {{team.teamMMRAvg}}\n                            </div>\n                            <div class=\"col\">\n\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col text-center\">\n                                <a class=\"btn btn-secondary\" (click)=\"selectedFromList(team)\">Select this team for management</a>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <!--  -->\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/admin/manage-team/manage-select-team.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/admin/manage-team/manage-select-team.component.ts ***!
  \*******************************************************************/
/*! exports provided: ManageSelectTeamComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageSelectTeamComponent", function() { return ManageSelectTeamComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_team_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/team.service */ "./src/app/services/team.service.ts");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ManageSelectTeamComponent = /** @class */ (function () {
    function ManageSelectTeamComponent(admin, team, router) {
        this.admin = admin;
        this.team = team;
        this.router = router;
        this.turnOnForm = false;
        this.teams = [];
        this.users = [];
        this.filterName = '';
        this.displayArray = [];
        this.pageSize = 10;
        this.filteredArray = [];
    }
    ManageSelectTeamComponent.prototype.ngAfterViewInit = function () {
        this.paginator.pageIndex = 0;
    };
    ManageSelectTeamComponent.prototype.pageEventHandler = function (pageEvent) {
        var i = pageEvent.pageIndex * this.pageSize;
        var endSlice = i + this.pageSize;
        if (endSlice > this.filteredArray.length) {
            endSlice = this.filteredArray.length;
        }
        this.displayArray = [];
        this.displayArray = this.filteredArray.slice(i, endSlice);
    };
    //callback function that is passed to the search component, accepts the profile selected from that component
    //santaizes the returned profile for URL and routes to that profile 
    ManageSelectTeamComponent.prototype.receiveTeam = function (teamProf) {
        if (teamProf != null && teamProf != undefined) {
            this.goView(this.team.routeFriendlyTeamName(teamProf.teamName_lower));
        }
    };
    ManageSelectTeamComponent.prototype.filterTeams = function (filterName) {
        var _this = this;
        if (filterName == null || filterName == undefined || filterName.length == 0) {
            this.filteredArray = this.teams;
            this.length = this.filteredArray.length;
            this.displayArray = this.filteredArray.slice(0, 10);
            this.paginator.firstPage();
        }
        else {
            this.filteredArray = [];
            this.teams.forEach(function (element) {
                if (element.teamName_lower.toLowerCase().indexOf(filterName.toLowerCase()) > -1) {
                    _this.filteredArray.push(element);
                }
            });
            this.length = this.filteredArray.length;
            this.displayArray = this.filteredArray.slice(0, 10);
            this.paginator.firstPage();
        }
    };
    //function tied to the list of teams, accepts team in scope, 
    //sanatizes the team name and routes to the proper endpoint
    ManageSelectTeamComponent.prototype.selectedFromList = function (prof) {
        this.goView(this.team.routeFriendlyTeamName(prof.teamName_lower));
    };
    //takes id and routes to the manageTeam of id
    ManageSelectTeamComponent.prototype.goView = function (id) {
        this.router.navigate(['_admin/manageTeam/', id]);
    };
    ManageSelectTeamComponent.prototype.ngOnInit = function () {
        var _this = this;
        //returns the teams for displaying in list. 
        //TODO: check into pagination 
        this.admin.getTeams().subscribe(function (res) {
            _this.teams = res;
            _this.filteredArray = _this.teams;
            _this.length = _this.filteredArray.length;
            _this.displayArray = _this.teams.slice(0, 10);
        }, function (err) {
            console.log(err);
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_4__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatPaginator"])
    ], ManageSelectTeamComponent.prototype, "paginator", void 0);
    ManageSelectTeamComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-manage-select-team',
            template: __webpack_require__(/*! ./manage-select-team.component.html */ "./src/app/admin/manage-team/manage-select-team.component.html"),
            styles: [__webpack_require__(/*! ./manage-select-team.component.css */ "./src/app/admin/manage-team/manage-select-team.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_2__["AdminService"], _services_team_service__WEBPACK_IMPORTED_MODULE_1__["TeamService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], ManageSelectTeamComponent);
    return ManageSelectTeamComponent;
}());



/***/ }),

/***/ "./src/app/admin/manage-team/manage-team-view/manage-team-view.component.css":
/*!***********************************************************************************!*\
  !*** ./src/app/admin/manage-team/manage-team-view/manage-team-view.component.css ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/admin/manage-team/manage-team-view/manage-team-view.component.html":
/*!************************************************************************************!*\
  !*** ./src/app/admin/manage-team/manage-team-view/manage-team-view.component.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <div class=\"row\">\n        <div class=\"col\">\n            <a [routerLink]=\"['/_admin/manageTeam']\">Back to Team Select</a>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col\">\n            <app-team-profile [source]=\"'admin'\" [passedProfile]=\"recievedProfile\"></app-team-profile>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/admin/manage-team/manage-team-view/manage-team-view.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/admin/manage-team/manage-team-view/manage-team-view.component.ts ***!
  \**********************************************************************************/
/*! exports provided: ManageTeamViewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageTeamViewComponent", function() { return ManageTeamViewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ManageTeamViewComponent = /** @class */ (function () {
    function ManageTeamViewComponent(route) {
        this.route = route;
        //component properties
        this.recievedProfile = '';
        if (this.route.snapshot.params['id']) {
            this.recievedProfile = this.route.snapshot.params['id'];
        }
    }
    ManageTeamViewComponent.prototype.ngOnInit = function () {
    };
    ManageTeamViewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-manage-team-view',
            template: __webpack_require__(/*! ./manage-team-view.component.html */ "./src/app/admin/manage-team/manage-team-view/manage-team-view.component.html"),
            styles: [__webpack_require__(/*! ./manage-team-view.component.css */ "./src/app/admin/manage-team/manage-team-view/manage-team-view.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]])
    ], ManageTeamViewComponent);
    return ManageTeamViewComponent;
}());



/***/ }),

/***/ "./src/app/admin/match-management/match-edit/match-edit.component.css":
/*!****************************************************************************!*\
  !*** ./src/app/admin/match-management/match-edit/match-edit.component.css ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/admin/match-management/match-edit/match-edit.component.html":
/*!*****************************************************************************!*\
  !*** ./src/app/admin/match-management/match-edit/match-edit.component.html ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <div class=\"row bg-white\">\n        <div class=\"col\">\n            <div class=\"row\">\n                <div class=\"col\">Match ID: {{match.matchId}}</div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col\">Season: {{match.season}}</div>\n                <div class=\"col\">Round: {{match.round}}</div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col\">\n                    Division: {{match.divisionConcat}}\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col\">\n                    <div *ngIf=\"match.home.teamName!=null&&match.home.teamName!=undefined&&match.home.teamName.length>0 else bye\">{{match.home.teamName}}</div>\n                </div>\n                <div class=\"col\">\n                    <div *ngIf=\"match.away.teamName!=null&&match.away.teamName!=undefined&&match.away.teamName.length>0 else bye\">{{match.away.teamName}}</div>\n                </div>\n                <ng-template #bye> BYE </ng-template>\n            </div>\n            <div class=\"row\">\n                <div class=\"col\">\n                    <h3>Scores:</h3>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-4\">\n                    <div class=\"row\">\n                        <div class=\"col\">\n                            <mat-form-field class=\"fullWidth\">\n                                <mat-select placeholder=\"{{match.home.teamName}} Score:\" [(ngModel)]=\"homeScore\" disableOptionCentering>\n                                    <mat-option [value]=\"0\">0</mat-option>\n                                    <mat-option [value]=\"1\">1</mat-option>\n                                    <mat-option [value]=\"2\">2</mat-option>\n                                </mat-select>\n                            </mat-form-field>\n                        </div>\n                    </div>\n\n                </div>\n                <div class=\"col\">\n\n                </div>\n                <div class=\"col\">\n                    <div class=\"row\">\n                        <div class=\"col\">\n                            <mat-form-field>\n                                <mat-select placeholder=\"{{match.away.teamName}} Score:\" [(ngModel)]=\"awayScore\" disableOptionCentering>\n                                    <mat-option [value]=\"0\">0</mat-option>\n                                    <mat-option [value]=\"1\">1</mat-option>\n                                    <mat-option [value]=\"2\">2</mat-option>\n                                </mat-select>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col\">\n                    <h3>Time:</h3>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col\">\n                    <mat-form-field>\n                        <input matInput [matDatepicker]=\"picker\" placeholder=\"Choose a date\" [(ngModel)]=\"friendlyDate\">\n                        <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n                        <mat-datepicker #picker></mat-datepicker>\n                    </mat-form-field>\n                </div>\n                <div class=\"col\">\n                    <mat-form-field>\n                        <mat-select placeholder=\"Start Time:\" [(ngModel)]=\"friendlyTime\">\n                            <mat-option *ngFor=\"let time of times\" [value]=\"time\">\n                                {{time}}\n                            </mat-option>\n                        </mat-select>\n                    </mat-form-field>\n\n                    <mat-form-field>\n                        <mat-select placeholder=\"AM/PM:\" [(ngModel)]=\"suffix\">\n                            <mat-option *ngFor=\"let suffix of amPm\" [value]=\"suffix\">\n                                {{suffix}}\n                            </mat-option>\n                        </mat-select>\n                    </mat-form-field>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col\">\n                    <h3>Caster Info:</h3>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col\">\n                    <mat-form-field class=\"tp-FullWidth\">\n                        <input matInput placeholder=\"Caster Name\" [(ngModel)]=\"match.casterName\">\n                    </mat-form-field>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col\">\n                    <mat-form-field class=\"tp-FullWidth\">\n                        <input matInput placeholder=\"Caster URL\" [(ngModel)]=\"match.casterUrl\">\n                    </mat-form-field>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col\">\n                    <button class=\"btn btn-success\" (click)=\"saveMatch(match)\"> Save </button>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/admin/match-management/match-edit/match-edit.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/admin/match-management/match-edit/match-edit.component.ts ***!
  \***************************************************************************/
/*! exports provided: MatchEditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatchEditComponent", function() { return MatchEditComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_schedule_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/schedule.service */ "./src/app/services/schedule.service.ts");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var src_app_services_utilities_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/utilities.service */ "./src/app/services/utilities.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MatchEditComponent = /** @class */ (function () {
    function MatchEditComponent(route, scheduleService, adminService, util) {
        this.route = route;
        this.scheduleService = scheduleService;
        this.adminService = adminService;
        this.util = util;
        this.times = [];
        this.match = {
            home: {
                teamName: '',
                score: null
            },
            away: {
                teamName: '',
                score: null
            },
            casterName: null,
            casterUrl: null
        }; //match prototype
        this.amPm = ['PM', 'AM'];
        if (this.route.snapshot.params['id']) {
            this.matchId = this.route.snapshot.params['id'];
        }
    }
    MatchEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.scheduleService.getMatchInfo(6, this.matchId).subscribe(function (res) {
            _this.match = res;
            if (_this.match.away.score || _this.match.home.score) {
                _this.homeScore = _this.match.home.score;
                _this.awayScore = _this.match.away.score;
            }
            if (!_this.match.scheduledTime) {
                _this.match.scheduledTime = {};
            }
            else {
                _this.friendlyDate = _this.util.getDatePickerFormatFromMS(_this.match.scheduledTime.startTime);
                _this.friendlyTime = _this.util.getTimeFromMS(_this.match.scheduledTime.startTime);
                _this.suffix = _this.util.getSuffixFromMS(_this.match.scheduledTime.startTime);
            }
        }, function (err) {
            console.log(err);
        });
        for (var i = 1; i < 13; i++) {
            for (var j = 0; j <= 3; j++) {
                var min = j * 15;
                if (min == 0) {
                    min = '00';
                }
                var time = i + ":" + min;
                this.times.push(time);
            }
        }
    };
    MatchEditComponent.prototype.saveMatch = function (match) {
        var _this = this;
        var submittable = true;
        if (this.homeScore == 1 && this.awayScore == 2 || this.awayScore == 1 && this.homeScore == 2) {
            //ok
        }
        else if (this.homeScore == 0 && this.awayScore == 2 || this.awayScore == 0 && this.homeScore == 2) {
            //ok
        }
        else if (this.homeScore + this.awayScore > 3) {
            submittable = false;
            alert('these scores are not allowed');
        }
        else {
            submittable = false;
            alert('these scores are not allowed');
        }
        if (this.friendlyDate && this.friendlyTime) {
            var years = this.friendlyDate.getFullYear();
            var month = this.friendlyDate.getMonth();
            var day = this.friendlyDate.getDate();
            var colonSplit = this.friendlyTime.split(':');
            colonSplit[1] = parseInt(colonSplit[1]);
            if (this.suffix == 'PM') {
                colonSplit[0] = parseInt(colonSplit[0]);
                colonSplit[0] += 12;
            }
            var setDate = new Date();
            setDate.setFullYear(years);
            setDate.setMonth(month);
            setDate.setDate(day);
            setDate.setHours(colonSplit[0]);
            setDate.setMinutes(colonSplit[1]);
            var msDate = setDate.getTime();
            var endDate = msDate + 5400000;
            match.scheduledTime.startTime = msDate;
            match.scheduledTime.endDate = endDate;
        }
        else if (this.friendlyDate && !this.friendlyTime) {
            alert('You have entered a date but no time!');
        }
        else if (!this.friendlyDate && this.friendlyTime) {
            alert('You have entered a time but no date!');
        }
        if (submittable) {
            this.adminService.matchUpdate(match).subscribe(function (res) {
                _this.ngOnInit();
            }, function (err) {
                console.log(err);
            });
        }
    };
    MatchEditComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-match-edit',
            template: __webpack_require__(/*! ./match-edit.component.html */ "./src/app/admin/match-management/match-edit/match-edit.component.html"),
            styles: [__webpack_require__(/*! ./match-edit.component.css */ "./src/app/admin/match-management/match-edit/match-edit.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], src_app_services_schedule_service__WEBPACK_IMPORTED_MODULE_2__["ScheduleService"], src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_3__["AdminService"], src_app_services_utilities_service__WEBPACK_IMPORTED_MODULE_4__["UtilitiesService"]])
    ], MatchEditComponent);
    return MatchEditComponent;
}());



/***/ }),

/***/ "./src/app/admin/match-management/match-management.component.css":
/*!***********************************************************************!*\
  !*** ./src/app/admin/match-management/match-management.component.css ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/admin/match-management/match-management.component.html":
/*!************************************************************************!*\
  !*** ./src/app/admin/match-management/match-management.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <div class=\"\">\n        <div class=\"row bg-white\">\n            <div class=\"col\">\n\n                <div class=\"row\">\n                    <div class=\"col\">\n                        <a [routerLink]=\"['/_admin/dashboard']\">Back to Dashboard</a>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col\">\n                        <h2>Match Admin Dashboard</h2>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col\">\n                        <mat-form-field class=\"mat-FullWidth\">\n                            <mat-select placeholder=\"Division:\" [(ngModel)]=\"selectedDivision\" (ngModelChange)=\"doFilterMatches(selectedDivision, selectedRound, filterTeam)\" disableOptionCentering>\n                                <mat-option [value]=\"null\"> </mat-option>\n                                <mat-option *ngFor=\"let division of divisions; let i = index\" [value]=\"division.divisionConcat\">{{division.displayName}}</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                    <div class=\"col\">\n                        <mat-form-field class=\"mat-FullWidth\">\n                            <mat-select placeholder=\"Round:\" [(ngModel)]=\"selectedRound\" (ngModelChange)=\"doFilterMatches(selectedDivision, selectedRound, filterTeam)\" disableOptionCentering>\n                                <mat-option [value]=\"null\"> </mat-option>\n                                <mat-option *ngFor=\"let round of rounds\" [value]=\"round\">{{round}}</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                    <div class=\"col\">\n                        <mat-form-field class=\"mat-FullWidth\">\n                            <input matInput placeholder=\"Team Name\" [(ngModel)]=\"filterTeam\" (ngModelChange)=\"doFilterMatches(selectedDivision, selectedRound, filterTeam)\">\n                        </mat-form-field>\n                    </div>\n                </div>\n                <mat-paginator [length]=\"length\" [pageIndex]=\"pageIndex\" [pageSize]=\"pageSize\" (page)=\"pageEventHandler($event)\">\n\n                </mat-paginator>\n                <div class=\"row p-2\" *ngFor=\"let match of displayArray; let ind = index;\" [ngClass]=\"{'bg-light': ind%2!=0}\">\n                    <div class=\"col-10\">\n                        <div class=\"row\">\n                            <div class=\"col\">\n                                <!-- {{match.division.displayName}} -->\n                            </div>\n                        </div>\n                        <div class=\"row mt-2\">\n                            <div class=\"col\">\n                                {{match.home.teamName}}\n                            </div>\n                            <div class=\"col\">\n                                -VS-\n                            </div>\n                            <div class=\"col\">\n                                {{match.away.teamName}}\n                            </div>\n                        </div>\n                        <div class=\"row mt-2\">\n                            <div class=\"col\">\n                                Scheduled Time: <span *ngIf=\"match.scheduledTime !=undefined && match.scheduledTime !=null else notScheduled\">{{displayTime(match.scheduledTime.startTime)}}</span>\n                                <ng-template #notScheduled>\n                                    <span>Not Yet Scheduled</span>\n                                </ng-template>\n                            </div>\n                        </div>\n                        <div class=\"row\" *ngIf=\"match.casterName !=undefined && match.casterName !=null\">\n                            <div class=\"col\">\n                                <div>\n                                    Caster: {{match.casterName}} Url: {{match.casterUrl}}\n                                </div>\n                            </div>\n                        </div>\n\n                    </div>\n                    <div class=\"col\">\n                        <a [routerLink]=\"[match.matchId]\" class=\"btn btn-primary\">Manage</a>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <!--  -->\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/admin/match-management/match-management.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/admin/match-management/match-management.component.ts ***!
  \**********************************************************************/
/*! exports provided: MatchManagementComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatchManagementComponent", function() { return MatchManagementComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_schedule_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/schedule.service */ "./src/app/services/schedule.service.ts");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MatchManagementComponent = /** @class */ (function () {
    function MatchManagementComponent(scheduleService, adminService) {
        this.scheduleService = scheduleService;
        this.adminService = adminService;
        //component properties
        this.hideForm = true;
        this.rounds = [];
        this.divisions = [];
        this.displayArray = [];
        this.pageSize = 10;
        this.filteredArray = [];
    }
    MatchManagementComponent.prototype.ngAfterViewInit = function () {
        this.paginator.pageIndex = 0;
    };
    MatchManagementComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.adminService.getDivisionList().subscribe(function (res) {
            _this.divisions = res;
            _this.scheduleService.getAllMatches().subscribe(function (sched) {
                _this.originalMatches = sched;
                _this.filterMatches = sched;
                _this.filterMatches.forEach(function (match) {
                    match.submitCaster = {
                        "name": '',
                        "URL": ''
                    };
                    if (_this.rounds.indexOf(match.round) < 0) {
                        _this.rounds.push(match.round);
                    }
                });
                _this.rounds.sort();
                _this.length = _this.filterMatches.length;
                _this.displayArray = _this.filterMatches.slice(0, _this.pageSize);
            });
        }, function (err) {
            console.log(err);
        });
    };
    MatchManagementComponent.prototype.pageEventHandler = function (pageEvent) {
        console.log(pageEvent);
        var i = pageEvent.pageIndex * this.pageSize;
        var endSlice = i + this.pageSize;
        if (endSlice > this.filterMatches.length) {
            endSlice = this.filterMatches.length;
        }
        console.log('index start ', i, ' endSlice ', endSlice);
        this.displayArray = [];
        this.displayArray = this.filterMatches.slice(i, endSlice);
    };
    /*
    div, round, team
    div, round,
    div, team,
    round, team,
    div,
    round,
    team
    */
    //filters the matches based on selected criteria
    MatchManagementComponent.prototype.doFilterMatches = function (div, round, team) {
        // console.log('div ', div, ' round ', round, ' team ', team);
        this.filterMatches = this.originalMatches.filter(function (match) {
            var home, away;
            if (!match.away.teamName) {
                away = '';
            }
            else {
                away = match.away.teamName.toLowerCase();
            }
            if (!match.home.teamName) {
                home = '';
            }
            else {
                home = match.home.teamName.toLowerCase();
            }
            if (team) {
                team = team.toLowerCase();
            }
            var pass = false;
            if (div && round && team) {
                if (div == match.divisionConcat && round == match.round &&
                    (away.indexOf(team) > -1 || home.indexOf(team) > -1)) {
                    pass = true;
                }
            }
            else if (div && round) {
                if (div == match.divisionConcat && round == match.round) {
                    pass = true;
                }
            }
            else if (div && team) {
                if (div == match.divisionConcat && (away.indexOf(team) > -1 || home.indexOf(team) > -1)) {
                    pass = true;
                }
            }
            else if (round && team) {
                if (round == match.round && (away.indexOf(team) > -1 || home.indexOf(team) > -1)) {
                    pass = true;
                }
            }
            else if (div) {
                if (div == match.divisionConcat) {
                    pass = true;
                }
            }
            else if (round) {
                if (round == match.round) {
                    pass = true;
                }
            }
            else if (team) {
                if (away.indexOf(team) > -1 || home.indexOf(team) > -1) {
                    pass = true;
                }
            }
            else {
                pass = true;
            }
            return pass;
        });
        this.length = this.filterMatches.length;
        this.displayArray = this.filterMatches.slice(0, this.pageSize > this.length ? this.length : this.pageSize);
        this.paginator.firstPage();
    };
    MatchManagementComponent.prototype.displayTime = function (ms) {
        var d = new Date(parseInt(ms));
        var day = d.getDate();
        var year = d.getFullYear();
        var month = d.getMonth();
        month = month + 1;
        var hours = d.getHours();
        var suffix = "AM";
        if (hours > 12) {
            hours = hours - 12;
            suffix = "PM";
        }
        var min = d.getMinutes();
        var minStr;
        if (min == 0) {
            minStr = '00';
        }
        else {
            minStr = min.toString();
        }
        var dateTime = month + '/' + day + '/' + year + ' @ ' + hours + ':' + minStr + " " + suffix;
        return dateTime;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatPaginator"])
    ], MatchManagementComponent.prototype, "paginator", void 0);
    MatchManagementComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-match-management',
            template: __webpack_require__(/*! ./match-management.component.html */ "./src/app/admin/match-management/match-management.component.html"),
            styles: [__webpack_require__(/*! ./match-management.component.css */ "./src/app/admin/match-management/match-management.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_services_schedule_service__WEBPACK_IMPORTED_MODULE_1__["ScheduleService"], src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_2__["AdminService"]])
    ], MatchManagementComponent);
    return MatchManagementComponent;
}());



/***/ }),

/***/ "./src/app/admin/match-management/set-deadline/set-deadline.component.css":
/*!********************************************************************************!*\
  !*** ./src/app/admin/match-management/set-deadline/set-deadline.component.css ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/admin/match-management/set-deadline/set-deadline.component.html":
/*!*********************************************************************************!*\
  !*** ./src/app/admin/match-management/set-deadline/set-deadline.component.html ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container forceFull\">\n    <div class=\"row\">\n        <div class=\"col\">\n            <a [routerLink]=\"['/_admin/dashboard']\">Back to Dashboard</a>\n        </div>\n    </div>\n    <div class=\"row mt-3\">\n        <div class=\"col\">\n            Select Divison:\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col\">\n            <mat-form-field>\n                <mat-select placeholder=\"Division:\" [(ngModel)]=\"selectedDivision\" (ngModelChange)=\"selected(selectedDivision)\" disableOptionCentering>\n                    <mat-option *ngFor=\"let division of divisions; let i = index\" [value]=\"division\">{{division.displayName}}</mat-option>\n                </mat-select>\n            </mat-form-field>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col\">\n            Select week to require a deadline through:\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col\">\n            <mat-form-field>\n                <mat-select placeholder=\"Division:\" [(ngModel)]=\"selectedWeek\" disableOptionCentering>\n                    <mat-option *ngFor=\"let week of weeks; let i = index\" [value]=\"week\">{{week}}</mat-option>\n                </mat-select>\n            </mat-form-field>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col\">\n            Select due date of WEEK 1 MATCH! THIS WILL SET DEADLINES +7 DAYS OUT FROM THIS WEEK FOR SPECIFIED WEEKS!\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col\">\n            <mat-form-field>\n                <input matInput [matDatepicker]=\"picker\" placeholder=\"Choose a date\" [(ngModel)]=\"friendlyDate\">\n                <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n                <mat-datepicker #picker></mat-datepicker>\n            </mat-form-field>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col\">\n            <button (click)=\"createDeadline()\" class=\"btn btn-info\">Set Scheduling Deadlines!</button>\n        </div>\n    </div>\n\n\n</div>"

/***/ }),

/***/ "./src/app/admin/match-management/set-deadline/set-deadline.component.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/admin/match-management/set-deadline/set-deadline.component.ts ***!
  \*******************************************************************************/
/*! exports provided: SetDeadlineComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetDeadlineComponent", function() { return SetDeadlineComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SetDeadlineComponent = /** @class */ (function () {
    function SetDeadlineComponent(admin) {
        this.admin = admin;
        this.weeks = [];
    }
    SetDeadlineComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.divisions = [];
        this.admin.getDivisionList().subscribe(function (res) {
            _this.divisions = res;
        }, function (err) {
            console.log(err);
        });
    };
    SetDeadlineComponent.prototype.selected = function (selectedDivision) {
        var number;
        this.selectedDivision = selectedDivision;
        if (selectedDivision.teams % 2 == 0) {
            number = selectedDivision.teams.length - 1;
        }
        else {
            number = selectedDivision.teams.length;
        }
        for (var i = 0; i < number; i++) {
            this.weeks.push(i + 1);
        }
    };
    SetDeadlineComponent.prototype.createDeadline = function () {
        console.log(this.friendlyDate);
        this.friendlyDate.setHours(23);
        this.friendlyDate.setMinutes(59);
        var time = this.friendlyDate.getTime();
        if (this.selectedDivision.divisionConcat && time && this.selectedWeek) {
            this.admin.setScheduleDeadline(this.selectedDivision.divisionConcat, time, this.selectedWeek).subscribe(function (res) {
                console.log(res);
            }, function (err) {
                console.log(err);
            });
        }
        else {
            alert('Input missing');
        }
    };
    SetDeadlineComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-set-deadline',
            template: __webpack_require__(/*! ./set-deadline.component.html */ "./src/app/admin/match-management/set-deadline/set-deadline.component.html"),
            styles: [__webpack_require__(/*! ./set-deadline.component.css */ "./src/app/admin/match-management/set-deadline/set-deadline.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_1__["AdminService"]])
    ], SetDeadlineComponent);
    return SetDeadlineComponent;
}());



/***/ }),

/***/ "./src/app/app-footer/app-footer.component.css":
/*!*****************************************************!*\
  !*** ./src/app/app-footer/app-footer.component.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".footer {\n    color: white\n}\n\n.footLink {\n    color: white\n}\n\n.footIco {\n    margin-right: 10px;\n}\n\nul {\n    list-style-type: none;\n    margin: 0;\n    padding: 0;\n}"

/***/ }),

/***/ "./src/app/app-footer/app-footer.component.html":
/*!******************************************************!*\
  !*** ./src/app/app-footer/app-footer.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- Footer -->\n\n<link rel=\"stylesheet\" href=\"https://use.fontawesome.com/releases/v5.6.3/css/all.css\" integrity=\"sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/\" crossorigin=\"anonymous\">\n<div class=\"p-3 bg-dark m-auto\">\n    <div class=\"container footer\">\n        <div class=\"row\">\n            <div class=\"col text-center\">\n                Quick Links\n                <ul>\n                    <li><a class=\"footLink\" [routerLink]=\"['/blog','3BLsIya6ZiWQWka4IeUw2']\">Rules</a></li>\n                    <li><a class=\"footLink\" [routerLink]=\"['/blog']\">Blog</a></li>\n                </ul>\n            </div>\n            <div class=\"col text-center\">\n                Copyright NGS\n            </div>\n            <div class=\"col text-center\">\n                Social Media:\n                <ul class=\"list-inline\">\n                    <li class=\"list-inline-item\">\n                        <a href=\"https://discordapp.com/invite/mQMfTga\" target=\"_blank\"> <i class=\"fab fa-3x footIco footLink fa-discord \"></i></a>\n                    </li>\n                    <li class=\"list-inline-item\">\n                        <a href=\"https://twitter.com/nexus_series?lang=en\" target=\"_blank\"> <i class=\"fab fa-3x footIco footLink  fa-twitter\"></i></a>\n                    </li>\n                    <li class=\"list-inline-item\">\n                        <a href=\"https://www.youtube.com/channel/UCnfohSTrlMyqiCwI5-3jXmw\" target=\"_blank\"><i class=\"fab footIco fa-3x footLink  fa-youtube\"></i></a>\n                    </li>\n                    <li class=\"list-inline-item\">\n                        <a href=\"https://www.patreon.com/heroesnexusgamingseries\" target=\"_blank\"><i class=\"fab footIco fa-3x footLink  fa-patreon\"></i></a>\n                    </li>\n                </ul>\n                <!-- <div class=\"row mt-2\">\n                    <div class=\"col\">\n                        <a href=\"https://discordapp.com/invite/mQMfTga\" target=\"_blank\"> <img class=\"img-fluid\" src=\"/assets/Discord.png\" alt=\"Discord\"></a>\n                    </div>\n                </div>\n                <div class=\"row mt-2\">\n                    <div class=\"col\">\n                        <a href=\"https://www.youtube.com/channel/UCnfohSTrlMyqiCwI5-3jXmw\" target=\"_blank\"><img class=\"img-fluid\" src=\"/assets/YouTube.png\" alt=\"YouTube\"></a>\n                    </div>\n                </div>\n                <div class=\"row mt-2\">\n                    <div class=\"col\">\n                 <a href=\"https://twitter.com/nexus_series?lang=en\" target=\"_blank\"> <img class=\"img-fluid\" src=\"/assets/Twitter.png\" alt=\"Twitter\"></a> -->\n\n\n            </div>\n        </div>\n\n        <!-- <div class=\"row mt-2\">\n            <div class=\"col\">\n                <a href=\"https://www.patreon.com/heroesnexusgamingseries\" target=\"_blank\"><img class=\"img-fluid\" src=\"/assets/Patreon.png\" alt=\"Patreon\"></a>\n            </div>\n        </div> -->\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/app-footer/app-footer.component.ts":
/*!****************************************************!*\
  !*** ./src/app/app-footer/app-footer.component.ts ***!
  \****************************************************/
/*! exports provided: AppFooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppFooterComponent", function() { return AppFooterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppFooterComponent = /** @class */ (function () {
    function AppFooterComponent() {
    }
    AppFooterComponent.prototype.ngOnInit = function () {
    };
    AppFooterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-footer',
            template: __webpack_require__(/*! ./app-footer.component.html */ "./src/app/app-footer/app-footer.component.html"),
            styles: [__webpack_require__(/*! ./app-footer.component.css */ "./src/app/app-footer/app-footer.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], AppFooterComponent);
    return AppFooterComponent;
}());



/***/ }),

/***/ "./src/app/app.Routes.ts":
/*!*******************************!*\
  !*** ./src/app/app.Routes.ts ***!
  \*******************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _directory_directory_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./directory/directory.component */ "./src/app/directory/directory.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _profile_edit_profile_edit_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./profile-edit/profile-edit.component */ "./src/app/profile-edit/profile-edit.component.ts");
/* harmony import */ var _team_profile_team_profile_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./team-profile/team-profile.component */ "./src/app/team-profile/team-profile.component.ts");
/* harmony import */ var _division_division_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./division/division.component */ "./src/app/division/division.component.ts");
/* harmony import */ var _outreach_email_response_outreach_email_response_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./outreach-email-response/outreach-email-response.component */ "./src/app/outreach-email-response/outreach-email-response.component.ts");
/* harmony import */ var _blog_list_blog_list_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./blog-list/blog-list.component */ "./src/app/blog-list/blog-list.component.ts");
/* harmony import */ var _blog_view_blog_view_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./blog-view/blog-view.component */ "./src/app/blog-view/blog-view.component.ts");
/* harmony import */ var _logout_logout_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./logout/logout.component */ "./src/app/logout/logout.component.ts");
/* harmony import */ var _create_team_create_team_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./create-team/create-team.component */ "./src/app/create-team/create-team.component.ts");
/* harmony import */ var _admin_approve_member_approve_member_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./admin/approve-member/approve-member.component */ "./src/app/admin/approve-member/approve-member.component.ts");
/* harmony import */ var _admin_delete_member_delete_member_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./admin/delete-member/delete-member.component */ "./src/app/admin/delete-member/delete-member.component.ts");
/* harmony import */ var _admin_manage_team_manage_select_team_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./admin/manage-team/manage-select-team.component */ "./src/app/admin/manage-team/manage-select-team.component.ts");
/* harmony import */ var _admin_division_management_division_management_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./admin/division-management/division-management.component */ "./src/app/admin/division-management/division-management.component.ts");
/* harmony import */ var _schedule_match_schedule_match_schedule_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./schedule/match-schedule/match-schedule.component */ "./src/app/schedule/match-schedule/match-schedule.component.ts");
/* harmony import */ var _schedule_team_schedule_team_schedule_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./schedule/team-schedule/team-schedule.component */ "./src/app/schedule/team-schedule/team-schedule.component.ts");
/* harmony import */ var _reporting_reporting_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./reporting/reporting.component */ "./src/app/reporting/reporting.component.ts");
/* harmony import */ var _admin_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./admin/dashboard/dashboard.component */ "./src/app/admin/dashboard/dashboard.component.ts");
/* harmony import */ var _caster_tools_caster_dashboard_caster_dashboard_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./caster-tools/caster-dashboard/caster-dashboard.component */ "./src/app/caster-tools/caster-dashboard/caster-dashboard.component.ts");
/* harmony import */ var _admin_match_management_match_management_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./admin/match-management/match-management.component */ "./src/app/admin/match-management/match-management.component.ts");
/* harmony import */ var _admin_match_management_match_edit_match_edit_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./admin/match-management/match-edit/match-edit.component */ "./src/app/admin/match-management/match-edit/match-edit.component.ts");
/* harmony import */ var _admin_admin_acl_management_admin_acl_management_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./admin/admin-acl-management/admin-acl-management.component */ "./src/app/admin/admin-acl-management/admin-acl-management.component.ts");
/* harmony import */ var _admin_admin_acl_management_update_roles_update_roles_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./admin/admin-acl-management/update-roles/update-roles.component */ "./src/app/admin/admin-acl-management/update-roles/update-roles.component.ts");
/* harmony import */ var _admin_manage_team_manage_team_view_manage_team_view_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./admin/manage-team/manage-team-view/manage-team-view.component */ "./src/app/admin/manage-team/manage-team-view/manage-team-view.component.ts");
/* harmony import */ var _services_auth_guard_service__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./services/auth-guard.service */ "./src/app/services/auth-guard.service.ts");
/* harmony import */ var _no_access_no_access_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./no-access/no-access.component */ "./src/app/no-access/no-access.component.ts");
/* harmony import */ var _session_timeout_session_timeout_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./session-timeout/session-timeout.component */ "./src/app/session-timeout/session-timeout.component.ts");
/* harmony import */ var _calendar_view_calendar_view_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./calendar-view/calendar-view.component */ "./src/app/calendar-view/calendar-view.component.ts");
/* harmony import */ var _calendar_view_event_large_event_large_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./calendar-view/event-large/event-large.component */ "./src/app/calendar-view/event-large/event-large.component.ts");
/* harmony import */ var _admin_match_management_set_deadline_set_deadline_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./admin/match-management/set-deadline/set-deadline.component */ "./src/app/admin/match-management/set-deadline/set-deadline.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

































var APP_ROUTES = [
    { path: 'directory', component: _directory_directory_component__WEBPACK_IMPORTED_MODULE_1__["DirectoryComponent"] },
    { path: '', component: _home_home_component__WEBPACK_IMPORTED_MODULE_0__["HomeComponent"] },
    { path: 'login', component: _login_login_component__WEBPACK_IMPORTED_MODULE_4__["LoginComponent"] },
    { path: 'logout', component: _logout_logout_component__WEBPACK_IMPORTED_MODULE_11__["LogoutComponent"] },
    { path: 'login/:token', component: _login_login_component__WEBPACK_IMPORTED_MODULE_4__["LoginComponent"] },
    { path: 'profile/:id', component: _profile_edit_profile_edit_component__WEBPACK_IMPORTED_MODULE_5__["ProfileEditComponent"] },
    { path: 'teamProfile/:id', component: _team_profile_team_profile_component__WEBPACK_IMPORTED_MODULE_6__["TeamProfileComponent"] },
    { path: 'teamCreate', component: _create_team_create_team_component__WEBPACK_IMPORTED_MODULE_12__["CreateTeamComponent"] },
    { path: 'division/:division', component: _division_division_component__WEBPACK_IMPORTED_MODULE_7__["DivisionComponent"], runGuardsAndResolvers: 'paramsChange' },
    { path: 'email/invite/:id', component: _outreach_email_response_outreach_email_response_component__WEBPACK_IMPORTED_MODULE_8__["OutreachEmailResponseComponent"] },
    { path: 'blog', component: _blog_list_blog_list_component__WEBPACK_IMPORTED_MODULE_9__["BlogListComponent"] },
    { path: 'blog/:id', component: _blog_view_blog_view_component__WEBPACK_IMPORTED_MODULE_10__["BlogViewComponent"] },
    { path: '_admin/approveTeamQueue', component: _admin_approve_member_approve_member_component__WEBPACK_IMPORTED_MODULE_13__["ApproveMemberComponent"], canActivate: [_services_auth_guard_service__WEBPACK_IMPORTED_MODULE_27__["AuthGuardService"]], data: { role: 'team' } },
    { path: '_admin/deleteUser', component: _admin_delete_member_delete_member_component__WEBPACK_IMPORTED_MODULE_14__["DeleteMemberComponent"], canActivate: [_services_auth_guard_service__WEBPACK_IMPORTED_MODULE_27__["AuthGuardService"]], data: { role: 'user' } },
    { path: '_admin/manageTeam', component: _admin_manage_team_manage_select_team_component__WEBPACK_IMPORTED_MODULE_15__["ManageSelectTeamComponent"], canActivate: [_services_auth_guard_service__WEBPACK_IMPORTED_MODULE_27__["AuthGuardService"]], data: { role: 'team' } },
    { path: '_admin/manageTeam/:id', component: _admin_manage_team_manage_team_view_manage_team_view_component__WEBPACK_IMPORTED_MODULE_26__["ManageTeamViewComponent"], canActivate: [_services_auth_guard_service__WEBPACK_IMPORTED_MODULE_27__["AuthGuardService"]], data: { role: 'team' } },
    { path: '_admin/divisionMgmt', component: _admin_division_management_division_management_component__WEBPACK_IMPORTED_MODULE_16__["DivisionManagementComponent"], canActivate: [_services_auth_guard_service__WEBPACK_IMPORTED_MODULE_27__["AuthGuardService"]], data: { role: 'division' } },
    { path: '_admin/matchMgmt', component: _admin_match_management_match_management_component__WEBPACK_IMPORTED_MODULE_22__["MatchManagementComponent"], canActivate: [_services_auth_guard_service__WEBPACK_IMPORTED_MODULE_27__["AuthGuardService"]], data: { role: 'match' } },
    { path: '_admin/matchMgmt/match/:id', component: _admin_match_management_match_edit_match_edit_component__WEBPACK_IMPORTED_MODULE_23__["MatchEditComponent"], canActivate: [_services_auth_guard_service__WEBPACK_IMPORTED_MODULE_27__["AuthGuardService"]], data: { role: 'match' } },
    { path: '_admin/userACLMgmt', component: _admin_admin_acl_management_admin_acl_management_component__WEBPACK_IMPORTED_MODULE_24__["AdminAclManagementComponent"], canActivate: [_services_auth_guard_service__WEBPACK_IMPORTED_MODULE_27__["AuthGuardService"]], data: { role: 'acl' } },
    { path: '_admin/userACLMgmt/:id', component: _admin_admin_acl_management_update_roles_update_roles_component__WEBPACK_IMPORTED_MODULE_25__["UpdateRolesComponent"], canActivate: [_services_auth_guard_service__WEBPACK_IMPORTED_MODULE_27__["AuthGuardService"]], data: { role: 'acl' } },
    { path: 'schedule/scheduleMatch/:id', component: _schedule_match_schedule_match_schedule_component__WEBPACK_IMPORTED_MODULE_17__["MatchScheduleComponent"] },
    { path: 'schedule/teamSchedule', component: _schedule_team_schedule_team_schedule_component__WEBPACK_IMPORTED_MODULE_18__["TeamScheduleComponent"] },
    { path: 'schedule/teamSchedule/:id', component: _schedule_team_schedule_team_schedule_component__WEBPACK_IMPORTED_MODULE_18__["TeamScheduleComponent"] },
    { path: 'reporting/:id', component: _reporting_reporting_component__WEBPACK_IMPORTED_MODULE_19__["ReportingComponent"] },
    { path: '_admin/dashboard', component: _admin_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_20__["DashboardComponent"], canActivate: [_services_auth_guard_service__WEBPACK_IMPORTED_MODULE_27__["AuthGuardService"]] },
    { path: '_casterDashboard', component: _caster_tools_caster_dashboard_caster_dashboard_component__WEBPACK_IMPORTED_MODULE_21__["CasterDashboardComponent"], canActivate: [_services_auth_guard_service__WEBPACK_IMPORTED_MODULE_27__["AuthGuardService"]], data: { role: 'caster' } },
    { path: 'noAccess/:id', component: _no_access_no_access_component__WEBPACK_IMPORTED_MODULE_28__["NoAccessComponent"] },
    { path: 'sessionTimeOut', component: _session_timeout_session_timeout_component__WEBPACK_IMPORTED_MODULE_29__["SessionTimeoutComponent"] },
    { path: 'calendar', component: _calendar_view_calendar_view_component__WEBPACK_IMPORTED_MODULE_30__["CalendarViewComponent"] },
    { path: 'event/:id', component: _calendar_view_event_large_event_large_component__WEBPACK_IMPORTED_MODULE_31__["EventLargeComponent"] },
    { path: '_admin/matchMgmt/weekDeadline', component: _admin_match_management_set_deadline_set_deadline_component__WEBPACK_IMPORTED_MODULE_32__["SetDeadlineComponent"], canActivate: [_services_auth_guard_service__WEBPACK_IMPORTED_MODULE_27__["AuthGuardService"]], data: { role: 'match' } }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(APP_ROUTES, { onSameUrlNavigation: 'reload', scrollPositionRestoration: 'enabled' })],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());

/*
, children: [
      { path: 'approveTeamQueue', component: ApproveMemberComponent },
      { path: 'deleteUser', component: DeleteMemberComponent },
      { path: 'manageTeam', component: DeleteTeamComponent },
      { path: 'divisionMgmt', component: DivisionManagementComponent }
    ]
*/


/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/* section {\n    padding-top: 56px;\n    height: 100%;\n}\n\n:host {\n    box-sizing: border-box;\n    display: block;\n    height: 100%;\n} */\n\n.clearfooter {\n    height: 1px;\n    clear: both;\n}\n\n#footer {\n    position: relative;\n}\n\n#content {\n    padding-top: 56px;\n    height: 100%;\n}\n\n#container {\n    min-height: 100%;\n    margin-bottom: -115px;\n    position: relative;\n}\n\n.bg-white{\n  box-shadow: 0px 0px 300px 150px rgb(69, 57, 82);\n}"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<div id=\"container\">\n    <div id=\"header\">\n        <app-nav></app-nav>\n    </div>\n    <div class=\"container bg-white pb-5\">\n        <div class=\"row\">\n            <div class=\"col\">\n                <div id=\"content\">\n                    <router-outlet></router-outlet>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"clearfooter\"></div>\n    <div id=\"footer\">\n        <app-footer></app-footer>\n    </div>\n</div>\n\n<!-- <app-home></app-home> -->\n<!-- <section>\n\n</section>\n<app-footer></app-footer> -->"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _services_notification_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/notification.service */ "./src/app/services/notification.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = /** @class */ (function () {
    function AppComponent(notificationService, snackBar) {
        var _this = this;
        this.notificationService = notificationService;
        this.snackBar = snackBar;
        this.notificationService.subj_notification.subscribe(function (message) {
            _this.snackBar.open(message, 'Dismiss', { duration: 2500 });
        });
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [_services_notification_service__WEBPACK_IMPORTED_MODULE_2__["NotificationService"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBar"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _directory_directory_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./directory/directory.component */ "./src/app/directory/directory.component.ts");
/* harmony import */ var _app_Routes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.Routes */ "./src/app/app.Routes.ts");
/* harmony import */ var _nav_nav_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./nav/nav.component */ "./src/app/nav/nav.component.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _services_token_interceptor_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./services/token-interceptor.service */ "./src/app/services/token-interceptor.service.ts");
/* harmony import */ var _profile_edit_profile_edit_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./profile-edit/profile-edit.component */ "./src/app/profile-edit/profile-edit.component.ts");
/* harmony import */ var _classes_aM_input_Import_class__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./classes/aM-input-Import.class */ "./src/app/classes/aM-input-Import.class.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _team_profile_team_profile_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./team-profile/team-profile.component */ "./src/app/team-profile/team-profile.component.ts");
/* harmony import */ var _division_division_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./division/division.component */ "./src/app/division/division.component.ts");
/* harmony import */ var _team_display_team_display_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./team-display/team-display.component */ "./src/app/team-display/team-display.component.ts");
/* harmony import */ var _members_display_members_display_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./members-display/members-display.component */ "./src/app/members-display/members-display.component.ts");
/* harmony import */ var _user_search_user_search_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./user-search/user-search.component */ "./src/app/user-search/user-search.component.ts");
/* harmony import */ var _outreach_email_response_outreach_email_response_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./outreach-email-response/outreach-email-response.component */ "./src/app/outreach-email-response/outreach-email-response.component.ts");
/* harmony import */ var _blog_list_blog_list_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./blog-list/blog-list.component */ "./src/app/blog-list/blog-list.component.ts");
/* harmony import */ var _blog_view_blog_view_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./blog-view/blog-view.component */ "./src/app/blog-view/blog-view.component.ts");
/* harmony import */ var _app_footer_app_footer_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./app-footer/app-footer.component */ "./src/app/app-footer/app-footer.component.ts");
/* harmony import */ var _image_upload_image_upload_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./image-upload/image-upload.component */ "./src/app/image-upload/image-upload.component.ts");
/* harmony import */ var ngx_croppie__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ngx-croppie */ "./node_modules/ngx-croppie/fesm5/ngx-croppie.js");
/* harmony import */ var _logout_logout_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./logout/logout.component */ "./src/app/logout/logout.component.ts");
/* harmony import */ var _create_team_create_team_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./create-team/create-team.component */ "./src/app/create-team/create-team.component.ts");
/* harmony import */ var _admin_approve_member_approve_member_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./admin/approve-member/approve-member.component */ "./src/app/admin/approve-member/approve-member.component.ts");
/* harmony import */ var _admin_approve_member_user_quick_view_user_quick_view_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./admin/approve-member/user-quick-view/user-quick-view.component */ "./src/app/admin/approve-member/user-quick-view/user-quick-view.component.ts");
/* harmony import */ var _admin_approve_member_team_quick_view_team_quick_view_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./admin/approve-member/team-quick-view/team-quick-view.component */ "./src/app/admin/approve-member/team-quick-view/team-quick-view.component.ts");
/* harmony import */ var _admin_approve_member_approve_member_view_approve_member_view_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./admin/approve-member/approve-member-view/approve-member-view.component */ "./src/app/admin/approve-member/approve-member-view/approve-member-view.component.ts");
/* harmony import */ var _admin_delete_member_delete_member_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./admin/delete-member/delete-member.component */ "./src/app/admin/delete-member/delete-member.component.ts");
/* harmony import */ var _admin_manage_team_manage_select_team_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./admin/manage-team/manage-select-team.component */ "./src/app/admin/manage-team/manage-select-team.component.ts");
/* harmony import */ var _team_search_team_search_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./team-search/team-search.component */ "./src/app/team-search/team-search.component.ts");
/* harmony import */ var _modal_change_captain_modal_change_captain_modal_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./modal/change-captain-modal/change-captain-modal.component */ "./src/app/modal/change-captain-modal/change-captain-modal.component.ts");
/* harmony import */ var _admin_division_management_division_management_component__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./admin/division-management/division-management.component */ "./src/app/admin/division-management/division-management.component.ts");
/* harmony import */ var _admin_division_management_add_team_add_team_component__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./admin/division-management/add-team/add-team.component */ "./src/app/admin/division-management/add-team/add-team.component.ts");
/* harmony import */ var _admin_division_management_division_props_division_props_component__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./admin/division-management/division-props/division-props.component */ "./src/app/admin/division-management/division-props/division-props.component.ts");
/* harmony import */ var _admin_division_management_remove_team_remove_team_component__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./admin/division-management/remove-team/remove-team.component */ "./src/app/admin/division-management/remove-team/remove-team.component.ts");
/* harmony import */ var _schedule_schedule_view_schedule_view_component__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./schedule/schedule-view/schedule-view.component */ "./src/app/schedule/schedule-view/schedule-view.component.ts");
/* harmony import */ var _schedule_match_schedule_match_schedule_component__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./schedule/match-schedule/match-schedule.component */ "./src/app/schedule/match-schedule/match-schedule.component.ts");
/* harmony import */ var _schedule_team_schedule_team_schedule_component__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./schedule/team-schedule/team-schedule.component */ "./src/app/schedule/team-schedule/team-schedule.component.ts");
/* harmony import */ var _reporting_reporting_component__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./reporting/reporting.component */ "./src/app/reporting/reporting.component.ts");
/* harmony import */ var _reporting_reporting_deck_reporting_deck_component__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./reporting/reporting-deck/reporting-deck.component */ "./src/app/reporting/reporting-deck/reporting-deck.component.ts");
/* harmony import */ var angular_file__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! angular-file */ "./node_modules/angular-file/index.js");
/* harmony import */ var angular_file__WEBPACK_IMPORTED_MODULE_44___default = /*#__PURE__*/__webpack_require__.n(angular_file__WEBPACK_IMPORTED_MODULE_44__);
/* harmony import */ var _admin_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./admin/dashboard/dashboard.component */ "./src/app/admin/dashboard/dashboard.component.ts");
/* harmony import */ var _caster_tools_caster_dashboard_caster_dashboard_component__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./caster-tools/caster-dashboard/caster-dashboard.component */ "./src/app/caster-tools/caster-dashboard/caster-dashboard.component.ts");
/* harmony import */ var _caster_tools_caster_dashboard_caster_inputs_caster_inputs_component__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./caster-tools/caster-dashboard/caster-inputs/caster-inputs.component */ "./src/app/caster-tools/caster-dashboard/caster-inputs/caster-inputs.component.ts");
/* harmony import */ var _admin_match_management_match_edit_match_edit_component__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./admin/match-management/match-edit/match-edit.component */ "./src/app/admin/match-management/match-edit/match-edit.component.ts");
/* harmony import */ var _admin_match_management_match_management_component__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./admin/match-management/match-management.component */ "./src/app/admin/match-management/match-management.component.ts");
/* harmony import */ var _admin_admin_acl_management_admin_acl_management_component__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./admin/admin-acl-management/admin-acl-management.component */ "./src/app/admin/admin-acl-management/admin-acl-management.component.ts");
/* harmony import */ var _admin_admin_acl_management_update_roles_update_roles_component__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./admin/admin-acl-management/update-roles/update-roles.component */ "./src/app/admin/admin-acl-management/update-roles/update-roles.component.ts");
/* harmony import */ var _standings_view_standings_view_component__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./standings-view/standings-view.component */ "./src/app/standings-view/standings-view.component.ts");
/* harmony import */ var _snackbar_snackbar_component__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./snackbar/snackbar.component */ "./src/app/snackbar/snackbar.component.ts");
/* harmony import */ var _admin_manage_team_manage_team_view_manage_team_view_component__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./admin/manage-team/manage-team-view/manage-team-view.component */ "./src/app/admin/manage-team/manage-team-view/manage-team-view.component.ts");
/* harmony import */ var _modal_delete_confrim_modal_delete_confrim_modal_component__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./modal/delete-confrim-modal/delete-confrim-modal.component */ "./src/app/modal/delete-confrim-modal/delete-confrim-modal.component.ts");
/* harmony import */ var _no_access_no_access_component__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./no-access/no-access.component */ "./src/app/no-access/no-access.component.ts");
/* harmony import */ var _session_timeout_session_timeout_component__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./session-timeout/session-timeout.component */ "./src/app/session-timeout/session-timeout.component.ts");
/* harmony import */ var _times_available_times_available_component__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./times-available/times-available.component */ "./src/app/times-available/times-available.component.ts");
/* harmony import */ var _questionnaire_questionnaire_component__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./questionnaire/questionnaire.component */ "./src/app/questionnaire/questionnaire.component.ts");
/* harmony import */ var _admin_logs_viewer_logs_viewer_component__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./admin/logs-viewer/logs-viewer.component */ "./src/app/admin/logs-viewer/logs-viewer.component.ts");
/* harmony import */ var _calendar_view_calendar_view_component__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./calendar-view/calendar-view.component */ "./src/app/calendar-view/calendar-view.component.ts");
/* harmony import */ var angular_calendar__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! angular-calendar */ "./node_modules/angular-calendar/fesm5/angular-calendar.js");
/* harmony import */ var angular_calendar_date_adapters_date_fns__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! angular-calendar/date-adapters/date-fns */ "./node_modules/angular-calendar/date-adapters/date-fns/index.js");
/* harmony import */ var angular_calendar_date_adapters_date_fns__WEBPACK_IMPORTED_MODULE_63___default = /*#__PURE__*/__webpack_require__.n(angular_calendar_date_adapters_date_fns__WEBPACK_IMPORTED_MODULE_63__);
/* harmony import */ var _calendar_view_event_modal_event_modal_component__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./calendar-view/event-modal/event-modal.component */ "./src/app/calendar-view/event-modal/event-modal.component.ts");
/* harmony import */ var _calendar_view_event_large_event_large_component__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./calendar-view/event-large/event-large.component */ "./src/app/calendar-view/event-large/event-large.component.ts");
/* harmony import */ var _admin_match_management_set_deadline_set_deadline_component__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ./admin/match-management/set-deadline/set-deadline.component */ "./src/app/admin/match-management/set-deadline/set-deadline.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



































































var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                _home_home_component__WEBPACK_IMPORTED_MODULE_4__["HomeComponent"],
                _directory_directory_component__WEBPACK_IMPORTED_MODULE_5__["DirectoryComponent"],
                _nav_nav_component__WEBPACK_IMPORTED_MODULE_7__["NavComponent"],
                _login_login_component__WEBPACK_IMPORTED_MODULE_8__["LoginComponent"],
                _profile_edit_profile_edit_component__WEBPACK_IMPORTED_MODULE_10__["ProfileEditComponent"],
                _team_profile_team_profile_component__WEBPACK_IMPORTED_MODULE_14__["TeamProfileComponent"],
                _division_division_component__WEBPACK_IMPORTED_MODULE_15__["DivisionComponent"],
                _team_display_team_display_component__WEBPACK_IMPORTED_MODULE_16__["TeamDisplayComponent"],
                _members_display_members_display_component__WEBPACK_IMPORTED_MODULE_17__["MembersDisplayComponent"],
                _user_search_user_search_component__WEBPACK_IMPORTED_MODULE_18__["UserSearchComponent"],
                _outreach_email_response_outreach_email_response_component__WEBPACK_IMPORTED_MODULE_19__["OutreachEmailResponseComponent"],
                _blog_list_blog_list_component__WEBPACK_IMPORTED_MODULE_20__["BlogListComponent"],
                _blog_view_blog_view_component__WEBPACK_IMPORTED_MODULE_21__["BlogViewComponent"],
                _app_footer_app_footer_component__WEBPACK_IMPORTED_MODULE_22__["AppFooterComponent"],
                _image_upload_image_upload_component__WEBPACK_IMPORTED_MODULE_23__["ImageUploadComponent"],
                _logout_logout_component__WEBPACK_IMPORTED_MODULE_25__["LogoutComponent"],
                _create_team_create_team_component__WEBPACK_IMPORTED_MODULE_26__["CreateTeamComponent"],
                _admin_approve_member_approve_member_component__WEBPACK_IMPORTED_MODULE_27__["ApproveMemberComponent"],
                _admin_approve_member_user_quick_view_user_quick_view_component__WEBPACK_IMPORTED_MODULE_28__["UserQuickViewComponent"],
                _admin_approve_member_team_quick_view_team_quick_view_component__WEBPACK_IMPORTED_MODULE_29__["TeamQuickViewComponent"],
                _admin_approve_member_approve_member_view_approve_member_view_component__WEBPACK_IMPORTED_MODULE_30__["ApproveMemberViewComponent"],
                _admin_delete_member_delete_member_component__WEBPACK_IMPORTED_MODULE_31__["DeleteMemberComponent"],
                _admin_manage_team_manage_select_team_component__WEBPACK_IMPORTED_MODULE_32__["ManageSelectTeamComponent"],
                _team_search_team_search_component__WEBPACK_IMPORTED_MODULE_33__["TeamSearchComponent"],
                _modal_change_captain_modal_change_captain_modal_component__WEBPACK_IMPORTED_MODULE_34__["ChangeCaptainModalComponent"],
                _admin_division_management_division_management_component__WEBPACK_IMPORTED_MODULE_35__["DivisionManagementComponent"],
                _admin_division_management_add_team_add_team_component__WEBPACK_IMPORTED_MODULE_36__["AddTeamComponent"],
                _admin_division_management_division_props_division_props_component__WEBPACK_IMPORTED_MODULE_37__["DivisionPropsComponent"],
                _admin_division_management_remove_team_remove_team_component__WEBPACK_IMPORTED_MODULE_38__["RemoveTeamComponent"],
                _schedule_schedule_view_schedule_view_component__WEBPACK_IMPORTED_MODULE_39__["ScheduleViewComponent"],
                _schedule_match_schedule_match_schedule_component__WEBPACK_IMPORTED_MODULE_40__["MatchScheduleComponent"],
                _schedule_team_schedule_team_schedule_component__WEBPACK_IMPORTED_MODULE_41__["TeamScheduleComponent"],
                _reporting_reporting_component__WEBPACK_IMPORTED_MODULE_42__["ReportingComponent"],
                _reporting_reporting_deck_reporting_deck_component__WEBPACK_IMPORTED_MODULE_43__["ReportingDeckComponent"],
                _admin_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_45__["DashboardComponent"],
                _caster_tools_caster_dashboard_caster_dashboard_component__WEBPACK_IMPORTED_MODULE_46__["CasterDashboardComponent"],
                _caster_tools_caster_dashboard_caster_inputs_caster_inputs_component__WEBPACK_IMPORTED_MODULE_47__["CasterInputsComponent"],
                _admin_match_management_match_management_component__WEBPACK_IMPORTED_MODULE_49__["MatchManagementComponent"],
                _admin_match_management_match_edit_match_edit_component__WEBPACK_IMPORTED_MODULE_48__["MatchEditComponent"],
                _admin_admin_acl_management_admin_acl_management_component__WEBPACK_IMPORTED_MODULE_50__["AdminAclManagementComponent"],
                _admin_admin_acl_management_update_roles_update_roles_component__WEBPACK_IMPORTED_MODULE_51__["UpdateRolesComponent"],
                _standings_view_standings_view_component__WEBPACK_IMPORTED_MODULE_52__["StandingsViewComponent"],
                _snackbar_snackbar_component__WEBPACK_IMPORTED_MODULE_53__["SnackbarComponent"],
                _admin_manage_team_manage_team_view_manage_team_view_component__WEBPACK_IMPORTED_MODULE_54__["ManageTeamViewComponent"],
                _modal_delete_confrim_modal_delete_confrim_modal_component__WEBPACK_IMPORTED_MODULE_55__["DeleteConfrimModalComponent"],
                _no_access_no_access_component__WEBPACK_IMPORTED_MODULE_56__["NoAccessComponent"],
                _session_timeout_session_timeout_component__WEBPACK_IMPORTED_MODULE_57__["SessionTimeoutComponent"],
                _times_available_times_available_component__WEBPACK_IMPORTED_MODULE_58__["TimesAvailableComponent"],
                _questionnaire_questionnaire_component__WEBPACK_IMPORTED_MODULE_59__["QuestionnaireComponent"],
                _admin_logs_viewer_logs_viewer_component__WEBPACK_IMPORTED_MODULE_60__["LogsViewerComponent"],
                _calendar_view_calendar_view_component__WEBPACK_IMPORTED_MODULE_61__["CalendarViewComponent"],
                _calendar_view_event_modal_event_modal_component__WEBPACK_IMPORTED_MODULE_64__["EventModalComponent"],
                _calendar_view_event_large_event_large_component__WEBPACK_IMPORTED_MODULE_65__["EventLargeComponent"],
                _admin_match_management_set_deadline_set_deadline_component__WEBPACK_IMPORTED_MODULE_66__["SetDeadlineComponent"]
            ],
            entryComponents: [
                _modal_delete_confrim_modal_delete_confrim_modal_component__WEBPACK_IMPORTED_MODULE_55__["DeleteConfrimModalComponent"],
                _modal_change_captain_modal_change_captain_modal_component__WEBPACK_IMPORTED_MODULE_34__["ChangeCaptainModalComponent"],
                _calendar_view_event_modal_event_modal_component__WEBPACK_IMPORTED_MODULE_64__["EventModalComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_12__["BrowserAnimationsModule"],
                _app_Routes__WEBPACK_IMPORTED_MODULE_6__["AppRoutingModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClientModule"],
                _classes_aM_input_Import_class__WEBPACK_IMPORTED_MODULE_11__["InputFormMaterial"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_13__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_13__["ReactiveFormsModule"],
                ngx_croppie__WEBPACK_IMPORTED_MODULE_24__["NgxCroppieModule"],
                angular_file__WEBPACK_IMPORTED_MODULE_44__["ngfModule"],
                angular_calendar__WEBPACK_IMPORTED_MODULE_62__["CalendarModule"].forRoot({
                    provide: angular_calendar__WEBPACK_IMPORTED_MODULE_62__["DateAdapter"],
                    useFactory: angular_calendar_date_adapters_date_fns__WEBPACK_IMPORTED_MODULE_63__["adapterFactory"]
                })
            ],
            providers: [
                {
                    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HTTP_INTERCEPTORS"],
                    useClass: _services_token_interceptor_service__WEBPACK_IMPORTED_MODULE_9__["ResponseInterceptor"],
                    multi: true
                }
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/blog-list/blog-list.component.css":
/*!***************************************************!*\
  !*** ./src/app/blog-list/blog-list.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".blog-card {\n    max-width: 300px;\n}\n\n.m-t {\n    margin-top: 10px;\n}\n\n.nav-offset {\n    padding-top: 60px;\n}\n\n.finger {\n  cursor: pointer;\n}\n\n.author-image {\n    background-size: cover;\n}\n\n.example-container {\n    display: flex;\n    flex-direction: column;\n    z-index: 1000;\n}\n\n.example-container>* {\n    width: 100%;\n}\n\n.mat-card{\n  background-color: #F26A2F;\n  color: white;\n}\n\n.mat-card-image{\n  background-color: white;\n}\n\n.anchor{\n  color: #482262;\n  text-decoration: underline;\n  font-weight: bold;\n  font-size: 16px;\n}"

/***/ }),

/***/ "./src/app/blog-list/blog-list.component.html":
/*!****************************************************!*\
  !*** ./src/app/blog-list/blog-list.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <div class=\"row bg-white forceFull\">\n        <div class=\"col\">\n            <div class=\"row\">\n                <div class=\"col\"></div>\n                <div class=\"col-6\">\n                    <mat-form-field class=\"example-container\">\n                        <mat-select placeholder=\"Filter by Category\" (selectionChange)=\"updateDisplay($event)\" disableOptionCentering>\n                            <mat-option [value]=\"'all'\">\n                                All\n                            </mat-option>\n                            <mat-option *ngFor=\"let category of categories\" [value]=\"category.sys.id\">\n                                {{category.fields.title}}\n                            </mat-option>\n                        </mat-select>\n                    </mat-form-field>\n                </div>\n                <div class=\"col\"></div>\n            </div>\n\n            <div class=\"row m-t\" *ngFor=\"let row of rows\">\n                <div class=\"col\" *ngFor=\"let item of row\">\n                    <mat-card class=\"blog-card finger\" (click)=\"goToBlogPage(item)\">\n                        <mat-card-header>\n                            <img mat-card-avatar src=\"{{item.fields.author.fields.image.fields.file.url}}\" class=\"author-image\">\n                            <mat-card-title><span class=\"anchor\">{{item.fields.title}}</span></mat-card-title>\n                            <mat-card-subtitle>{{item.fields.author.fields.name}}</mat-card-subtitle>\n                        </mat-card-header>\n                        <img mat-card-image src=\"{{item.fields.heroImage.fields.file.url}}?w=450&h=300&fit=scale\" alt=\"{{item.fields.heroImage.fields.description}}\">\n                        <mat-card-content>\n                            <div>{{item.fields.description}}</div>\n                        </mat-card-content>\n                    </mat-card>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/blog-list/blog-list.component.ts":
/*!**************************************************!*\
  !*** ./src/app/blog-list/blog-list.component.ts ***!
  \**************************************************/
/*! exports provided: BlogListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BlogListComponent", function() { return BlogListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_contentful_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/contentful.service */ "./src/app/services/contentful.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var BlogListComponent = /** @class */ (function () {
    function BlogListComponent(router, contentfulService) {
        this.router = router;
        this.contentfulService = contentfulService;
        this.perColumn = 3;
        this.blogs = [];
        this.rows = [];
        this.selection = '';
    }
    BlogListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.contentfulService.getCategories().then(function (res) {
            _this.categories = res;
        });
        this.contentfulService.getBlogs().then(function (res) {
            _this.createMyDisplay(res);
        });
    };
    BlogListComponent.prototype.updateDisplay = function (val) {
        var _this = this;
        val = val.value;
        if (val == 'all') {
            this.selection = val;
            this.contentfulService.getBlogs().then(function (res) {
                _this.createMyDisplay(res);
            });
        }
        else if (val !== this.selection) {
            this.selection = val;
            this.contentfulService.getBlogs({ 'links_to_entry': this.selection }).then(function (res) {
                _this.createMyDisplay(res);
            });
        }
        else {
            //do nothing
        }
    };
    BlogListComponent.prototype.createMyDisplay = function (dat) {
        if (!this.perColumn) {
            this.perColumn = 3;
        }
        this.rows = [];
        if (dat != undefined && dat.length > 0) {
            if (dat.length > this.perColumn) {
                var temparr = [];
                for (var i = 0; i < dat.length; i++) {
                    if (i > 0 && i % this.perColumn == 0) {
                        this.rows.push(temparr);
                        temparr = [];
                    }
                    temparr.push(dat[i]);
                }
                if (temparr.length > 0) {
                    this.rows.push(temparr);
                }
            }
            else {
                this.rows.push(dat);
            }
        }
        else {
            this.rows = [];
        }
    };
    BlogListComponent.prototype.goToBlogPage = function (blog) {
        this.contentfulService.cacheBlog(blog);
        this.router.navigate(['/blog', blog.sys.id]);
    };
    BlogListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-blog-list',
            template: __webpack_require__(/*! ./blog-list.component.html */ "./src/app/blog-list/blog-list.component.html"),
            styles: [__webpack_require__(/*! ./blog-list.component.css */ "./src/app/blog-list/blog-list.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _services_contentful_service__WEBPACK_IMPORTED_MODULE_2__["ContentfulService"]])
    ], BlogListComponent);
    return BlogListComponent;
}());



/***/ }),

/***/ "./src/app/blog-view/blog-view.component.css":
/*!***************************************************!*\
  !*** ./src/app/blog-view/blog-view.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".breadcrumb{\r\n  background-color: #F26A2F;\r\n}\r\n\r\n.breadcrumb-item {\r\n    color: white;\r\n}\r\n\r\n.breadcrumb-item::before {\r\n  color: white;\r\n}\r\n\r\n.breadcrumb-item > a {\r\n  color: #482262;\r\n}"

/***/ }),

/***/ "./src/app/blog-view/blog-view.component.html":
/*!****************************************************!*\
  !*** ./src/app/blog-view/blog-view.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <div class=\"row bg-white forceFull\">\n        <div class=\"col\">\n            <!-- Page Heading/Breadcrumbs -->\n            <h1 class=\"mt-4 mb-3\">{{displayBlog.fields.title}}\n                <small>by<i>{{displayBlog.fields.author.fields.name}}</i></small>\n            </h1>\n\n            <ol class=\"breadcrumb\">\n                <li class=\"breadcrumb-item\">\n                    <a [routerLink]=\"['/blog']\">Blog Home</a>\n                </li>\n                <li class=\"breadcrumb-item active\">{{displayBlog.fields.title}}</li>\n            </ol>\n\n            <div class=\"row\">\n                <!-- Post Content Column -->\n                <div class=\"col\">\n                    <!-- Preview Image -->\n                    <div class=\"text-center\"><img class=\"img-fluid rounded\" src=\"{{displayBlog.fields.heroImage.fields.file.url}}?w=900&h=300\" alt=\"\"></div>\n                    <hr>\n                    <!-- Date/Time -->\n                    <p class=\"date\">Posted on {{displayBlog.fields.publishDate | date}}</p>\n                    <hr>\n                    <!-- Post Content -->\n                    <p class=\"lead\">{{displayBlog.fields.description}}</p>\n                    <div [innerHTML]=\"md.convertMarkdown(displayBlog.fields.body)\"></div>\n                    <hr>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<!-- Comments Form -->\n<!-- comments disabled for now -->\n<!-- <div class=\"card my-4\">\n                <h5 class=\"card-header\">Leave a Comment:</h5>\n                <div class=\"card-body\">\n                    <form>\n                        <div class=\"form-group\">\n                            <textarea class=\"form-control\" rows=\"3\"></textarea>\n                        </div>\n                        <button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n                    </form>\n                </div>\n            </div> -->\n\n<!-- Single Comment -->\n<!-- <div class=\"media mb-4\">\n                <img class=\"d-flex mr-3 rounded-circle\" src=\"http://placehold.it/50x50\" alt=\"\">\n                <div class=\"media-body\">\n                    <h5 class=\"mt-0\">Commenter Name</h5>\n                    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.\n                </div>\n            </div> -->\n\n<!-- Comment with nested comments -->\n<!-- <div class=\"media mb-4\">\n                <img class=\"d-flex mr-3 rounded-circle\" src=\"http://placehold.it/50x50\" alt=\"\">\n                <div class=\"media-body\">\n                    <h5 class=\"mt-0\">Commenter Name</h5>\n                    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.\n\n                    <div class=\"media mt-4\">\n                        <img class=\"d-flex mr-3 rounded-circle\" src=\"http://placehold.it/50x50\" alt=\"\">\n                        <div class=\"media-body\">\n                            <h5 class=\"mt-0\">Commenter Name</h5>\n                            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.\n                        </div>\n                    </div>\n\n                    <div class=\"media mt-4\">\n                        <img class=\"d-flex mr-3 rounded-circle\" src=\"http://placehold.it/50x50\" alt=\"\">\n                        <div class=\"media-body\">\n                            <h5 class=\"mt-0\">Commenter Name</h5>\n                            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.\n                        </div>\n                    </div>\n\n                </div>\n            </div> -->\n<!-- Sidebar Widgets Column -->\n<!-- <div class=\"col-md-4\"> -->\n\n<!-- Search Widget -->\n<!-- <div class=\"card mb-4\">\n                <h5 class=\"card-header\">Search</h5>\n                <div class=\"card-body\">\n                    <div class=\"input-group\">\n                        <input type=\"text\" class=\"form-control\" placeholder=\"Search for...\">\n                        <span class=\"input-group-btn\">\n            <button class=\"btn btn-secondary\" type=\"button\">Go!</button>\n          </span>\n                    </div>\n                </div>\n            </div> -->\n\n<!-- Categories Widget -->\n<!-- <div class=\"card my-4\">\n                <h5 class=\"card-header\">Categories</h5>\n                <div class=\"card-body\">\n                    <div class=\"row\">\n                        <div class=\"col-lg-6\">\n                            <ul class=\"list-unstyled mb-0\">\n                                <li>\n                                    <a href=\"#\">Web Design</a>\n                                </li>\n                                <li>\n                                    <a href=\"#\">HTML</a>\n                                </li>\n                                <li>\n                                    <a href=\"#\">Freebies</a>\n                                </li>\n                            </ul>\n                        </div>\n                        <div class=\"col-lg-6\">\n                            <ul class=\"list-unstyled mb-0\">\n                                <li>\n                                    <a href=\"#\">JavaScript</a>\n                                </li>\n                                <li>\n                                    <a href=\"#\">CSS</a>\n                                </li>\n                                <li>\n                                    <a href=\"#\">Tutorials</a>\n                                </li>\n                            </ul>\n                        </div>\n                    </div>\n                </div>\n            </div> -->\n\n<!-- Side Widget -->\n<!-- <div class=\"card my-4\">\n                <h5 class=\"card-header\">Side Widget</h5>\n                <div class=\"card-body\">\n                    You can put anything you want inside of these side widgets. They are easy to use, and feature the new Bootstrap 4 card containers!\n                </div>\n            </div> -->\n\n<!-- </div>\n\n    </div> -->\n<!-- /.row -->"

/***/ }),

/***/ "./src/app/blog-view/blog-view.component.ts":
/*!**************************************************!*\
  !*** ./src/app/blog-view/blog-view.component.ts ***!
  \**************************************************/
/*! exports provided: BlogViewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BlogViewComponent", function() { return BlogViewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_contentful_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/contentful.service */ "./src/app/services/contentful.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_markdown_parser_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/markdown-parser.service */ "./src/app/services/markdown-parser.service.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BlogViewComponent = /** @class */ (function () {
    function BlogViewComponent(contentfulService, route, md) {
        this.contentfulService = contentfulService;
        this.route = route;
        this.md = md;
        //gets the ID from the url route
        if (this.route.snapshot.params['id']) {
            this.recId = this.route.snapshot.params['id'];
        }
    }
    BlogViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.displayBlog = {
            'fields': {
                'body': '',
                'author': {
                    'fields': {
                        'name': ''
                    }
                },
                'title': '',
                'heroImage': {
                    'fields': {
                        'file': {
                            'url': ''
                        }
                    }
                }
            }
        };
        //gets provided blog post from received id
        if (this.contentfulService.getCache()) {
            this.displayBlog = this.contentfulService.getCache();
            this.contentfulService.getCache();
        }
        else {
            this.contentfulService.getBlog(this.recId).then(function (res) {
                Object(lodash__WEBPACK_IMPORTED_MODULE_4__["merge"])(_this.displayBlog, res);
                // this.displayBlog = res;
            });
        }
    };
    BlogViewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-blog-view',
            template: __webpack_require__(/*! ./blog-view.component.html */ "./src/app/blog-view/blog-view.component.html"),
            styles: [__webpack_require__(/*! ./blog-view.component.css */ "./src/app/blog-view/blog-view.component.css")]
        }),
        __metadata("design:paramtypes", [_services_contentful_service__WEBPACK_IMPORTED_MODULE_1__["ContentfulService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _services_markdown_parser_service__WEBPACK_IMPORTED_MODULE_3__["MarkdownParserService"]])
    ], BlogViewComponent);
    return BlogViewComponent;
}());



/***/ }),

/***/ "./src/app/calendar-view/calendar-view.component.css":
/*!***********************************************************!*\
  !*** ./src/app/calendar-view/calendar-view.component.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/calendar-view/calendar-view.component.html":
/*!************************************************************!*\
  !*** ./src/app/calendar-view/calendar-view.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <div class=\"row bg-white\">\n        <div class=\"col\">\n            <!-- \n            <ng-template #modalContent let-close=\"close\">\n                <div class=\"modal-header\">\n                    <h5 class=\"modal-title\">Event action occurred</h5>\n                    <button type=\"button\" class=\"close\" (click)=\"close()\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n                </div>\n                <div class=\"modal-body\">\n                    <div>\n                        Action:\n                        <pre>{{ modalData?.action }}</pre>\n                    </div>\n                    <div>\n                        Event:\n                        <pre>{{ modalData?.event | json }}</pre>\n                    </div>\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-outline-secondary\" (click)=\"close()\">OK</button>\n                </div>\n            </ng-template> -->\n            <div class=\"row mt-4\">\n                <div class=\"col\">\n                    Eventually we will have a table of colors for divs / games casted etc.\n                </div>\n            </div>\n            <div class=\"row text-center mt-3\">\n                <div class=\"col-md-4\">\n                    <div class=\"btn-group\">\n                        <div class=\"btn btn-primary\" mwlCalendarPreviousView [view]=\"view\" [(viewDate)]=\"viewDate\" (viewDateChange)=\"activeDayIsOpen = false\">\n                            Previous\n                        </div>\n                        <div class=\"btn btn-outline-secondary\" mwlCalendarToday [(viewDate)]=\"viewDate\">\n                            Today\n                        </div>\n                        <div class=\"btn btn-primary\" mwlCalendarNextView [view]=\"view\" [(viewDate)]=\"viewDate\" (viewDateChange)=\"activeDayIsOpen = false\">\n                            Next\n                        </div>\n                    </div>\n                </div>\n                <div class=\"col-md-4\">\n                    <h3>{{ viewDate | calendarDate:(view + 'ViewTitle'):'en' }}</h3>\n                </div>\n                <div class=\"col-md-4\">\n                    <div class=\"btn-group\">\n                        <div class=\"btn btn-primary\" (click)=\"view = CalendarView.Month\" [class.active]=\"view === CalendarView.Month\">\n                            Month\n                        </div>\n                        <div class=\"btn btn-primary\" (click)=\"view = CalendarView.Week\" [class.active]=\"view === CalendarView.Week\">\n                            Week\n                        </div>\n                        <div class=\"btn btn-primary\" (click)=\"view = CalendarView.Day\" [class.active]=\"view === CalendarView.Day\">\n                            Day\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <br>\n            <div [ngSwitch]=\"view\">\n                <mwl-calendar-month-view *ngSwitchCase=\"CalendarView.Month\" [viewDate]=\"viewDate\" [events]=\"events\" [refresh]=\"refresh\" [activeDayIsOpen]=\"activeDayIsOpen\" (dayClicked)=\"dayClicked($event.day)\" (eventClicked)=\"handleEvent('Clicked', $event.event)\" (eventTimesChanged)=\"eventTimesChanged($event)\">\n                </mwl-calendar-month-view>\n                <mwl-calendar-week-view *ngSwitchCase=\"CalendarView.Week\" [viewDate]=\"viewDate\" [events]=\"events\" [refresh]=\"refresh\" (eventClicked)=\"handleEvent('Clicked', $event.event)\" (eventTimesChanged)=\"eventTimesChanged($event)\">\n                </mwl-calendar-week-view>\n                <mwl-calendar-day-view *ngSwitchCase=\"CalendarView.Day\" [viewDate]=\"viewDate\" [events]=\"events\" [refresh]=\"refresh\" (eventClicked)=\"handleEvent('Clicked', $event.event)\" (eventTimesChanged)=\"eventTimesChanged($event)\">\n                </mwl-calendar-day-view>\n            </div>\n\n            <br><br><br>\n\n            <!-- <h3>\n                Events List\n                <div class=\"clearfix\"></div>\n            </h3> -->\n\n            <!-- <table class=\"table table-bordered\">\n\n                <thead>\n                    <tr>\n                        <th>Title</th>\n                        <th>Primary color</th>\n                        <th>Starts at</th>\n                        <th>Ends at</th>\n                    </tr>\n                </thead>\n\n                <tbody>\n                    <tr *ngFor=\"let event of events; let index = index\">\n                        <td>\n                            <input type=\"text\" disabled=\"true\" class=\"form-control\" [(ngModel)]=\"event.title\" (keyup)=\"refresh.next()\">\n                        </td>\n                        <td>\n                            <input type=\"color\" disabled=\"true\" [(ngModel)]=\"event.color.primary\">\n                        </td>\n                        <td>\n                            <input class=\"form-control\" disabled=\"true\" type=\"text\" mwlFlatpickr [(ngModel)]=\"event.start\" dateFormat=\"Y-m-dTH:i\" altFormat=\"F j, Y H:i\">\n                        </td>\n                        <td>\n                            <input class=\"form-control\" disabled=\"true\" type=\"text\" mwlFlatpickr [(ngModel)]=\"event.end\" dateFormat=\"Y-m-dTH:i\" altFormat=\"F j, Y H:i\">\n                        </td>\n                    </tr>\n                </tbody>\n\n            </table> -->\n\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/calendar-view/calendar-view.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/calendar-view/calendar-view.component.ts ***!
  \**********************************************************/
/*! exports provided: CalendarViewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CalendarViewComponent", function() { return CalendarViewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(date_fns__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var angular_calendar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular-calendar */ "./node_modules/angular-calendar/fesm5/angular-calendar.js");
/* harmony import */ var _services_schedule_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/schedule.service */ "./src/app/services/schedule.service.ts");
/* harmony import */ var _event_modal_event_modal_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./event-modal/event-modal.component */ "./src/app/calendar-view/event-modal/event-modal.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var colors = {
    red: {
        primary: '#ad2121',
        secondary: '#FAE3E3'
    },
    blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF'
    },
    yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA'
    }
};
var CalendarViewComponent = /** @class */ (function () {
    function CalendarViewComponent(matches, dialog, router) {
        var _this = this;
        this.matches = matches;
        this.dialog = dialog;
        this.router = router;
        this._matches = [];
        this.view = angular_calendar__WEBPACK_IMPORTED_MODULE_3__["CalendarView"].Month;
        this.CalendarView = angular_calendar__WEBPACK_IMPORTED_MODULE_3__["CalendarView"];
        this.viewDate = new Date();
        this.actions = [
            {
                label: '<i class="fa fa-fw fa-pencil"></i>',
                onClick: function (_a) {
                    var event = _a.event;
                    _this.handleEvent('Edited', event);
                }
            },
            {
                label: '<i class="fa fa-fw fa-times"></i>',
                onClick: function (_a) {
                    var event = _a.event;
                    _this.events = _this.events.filter(function (iEvent) { return iEvent !== event; });
                    _this.handleEvent('Deleted', event);
                }
            }
        ];
        this.refresh = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.events = [];
        this.activeDayIsOpen = true;
    }
    CalendarViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.matches.getAllMatchesWithStartTime().subscribe(function (res) {
            var matches = res;
            _this._matches = res;
            matches.forEach(function (match) {
                var event = {
                    'start': new Date(parseInt(match.scheduledTime.startTime)),
                    'end': new Date(parseInt(match.scheduledTime.endTime)),
                    'title': match.home.teamName + ' vs ' + match.away.teamName,
                    'meta': match.matchId
                };
                if (match.casterName != null || match.casterName != undefined) {
                    event['title'] += ' Casted! ';
                }
                event['color'] = colors.red;
                _this.events.push(event);
            });
            _this.refresh.next();
        }, function (err) {
            console.log(err);
        });
        //todo: pull in matches
    };
    CalendarViewComponent.prototype.dayClicked = function (_a) {
        var date = _a.date, events = _a.events;
        if (Object(date_fns__WEBPACK_IMPORTED_MODULE_1__["isSameMonth"])(date, this.viewDate)) {
            this.viewDate = date;
            if ((Object(date_fns__WEBPACK_IMPORTED_MODULE_1__["isSameDay"])(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0) {
                this.activeDayIsOpen = false;
            }
            else {
                this.activeDayIsOpen = true;
            }
        }
    };
    CalendarViewComponent.prototype.openDialog = function (match) {
        var dialogRef = this.dialog.open(_event_modal_event_modal_component__WEBPACK_IMPORTED_MODULE_5__["EventModalComponent"], {
            width: '700px',
            data: match
        });
        dialogRef.afterClosed().subscribe(function (result) {
        });
    };
    CalendarViewComponent.prototype.eventTimesChanged = function (_a) {
        var event = _a.event, newStart = _a.newStart, newEnd = _a.newEnd;
        event.start = newStart;
        event.end = newEnd;
        this.handleEvent('Dropped or resized', event);
        this.refresh.next();
    };
    CalendarViewComponent.prototype.handleEvent = function (action, event) {
        // console.log('hi, ', event);
        // let passMatch;
        // this._matches.forEach(match=>{
        //   console.log('event.meta ', event.meta, ' match.matchId ', match.matchId)
        //   if(event.meta == match.matchId){
        //     passMatch = match;
        //   }
        // });
        // this.openDialog(passMatch);
        this.router.navigate(['event/', event.meta]);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modalContent'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"])
    ], CalendarViewComponent.prototype, "modalContent", void 0);
    CalendarViewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-calendar-view',
            template: __webpack_require__(/*! ./calendar-view.component.html */ "./src/app/calendar-view/calendar-view.component.html"),
            styles: [__webpack_require__(/*! ./calendar-view.component.css */ "./src/app/calendar-view/calendar-view.component.css")]
        }),
        __metadata("design:paramtypes", [_services_schedule_service__WEBPACK_IMPORTED_MODULE_4__["ScheduleService"], _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatDialog"], _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"]])
    ], CalendarViewComponent);
    return CalendarViewComponent;
}());



/***/ }),

/***/ "./src/app/calendar-view/event-large/event-large.component.css":
/*!*********************************************************************!*\
  !*** ./src/app/calendar-view/event-large/event-large.component.css ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/calendar-view/event-large/event-large.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/calendar-view/event-large/event-large.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <div class=\"row\">\n        <div class=\"col\">\n            <div class=\"row\">\n                <div class=\"col text-center\">\n                    <h3>Match Details</h3>\n                </div>\n            </div>\n            <div class=\"row mt-3\" *ngIf=\"match\">\n                <div class=\"col\">\n                    <div class=\"row\">\n                        <div class=\"col-5\">\n                            <div class=\"row\">\n                                <div class=\"col\">\n                                    <img class=\"img-fluid\" src=\"{{team.imageFQDN(match.home.logo)}}\" width=\"150\" alt=\"Team Logo\">\n                                </div>\n                                <div class=\"col vertical-middle\">\n                                    <div *ngIf=\"match.home.teamName\">{{match.home.teamName}}</div>\n\n                                </div>\n                                <div class=\"col-2 vertical-middle\">\n                                    <span> {{match.home.wins}} - {{match.home.losses}} </span>\n                                </div>\n                            </div>\n\n                        </div>\n                        <div class=\"col-2 vertical-middle text-center\">\n                            - VS -\n                        </div>\n                        <div class=\"col-5\">\n                            <div class=\"row\">\n                                <div class=\"col-2 vertical-middle\">\n                                    <span> {{match.away.wins}} - {{match.away.losses}} </span>\n                                </div>\n                                <div class=\"col vertical-middle\">\n                                    <div *ngIf=\"match.away.teamName; else bye\">{{match.away.teamName}}</div>\n                                </div>\n                                <div class=\"col\">\n                                    <img class=\"img-fluid\" src=\"{{team.imageFQDN(match.away.logo)}}\" width=\"150\" alt=\"Team Logo\">\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col\">\n\n                        </div>\n                        <div class=\"col-7 text-center\">\n                            <span *ngIf=\"match.scheduledTime else tbd\">Scheduled Time: {{match.friendlyDate}} - {{match.friendlyTime}} {{match.suffix}}</span>\n                            <ng-template #tbd>\n                                <button class=\"btn btn-info\" (click)=\"scheduleMatch(match.matchId)\"> Schedule this match! </button>\n                            </ng-template>\n                        </div>\n                        <div class=\"col\">\n\n                        </div>\n                    </div>\n                    <div class=\"row\" *ngIf=\"match.casterName && match.casterUrl\">\n                        <div class=\"col\"></div>\n                        <div class=\"col-7 text-center\">\n                            <span> Casted by:</span> {{match.casterName}} : <a href=\"{{util.prePendHttp(match.casterUrl)}}\" target=\"_blank\">{{match.casterUrl}}</a>\n                        </div>\n                        <div class=\"col\"></div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/calendar-view/event-large/event-large.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/calendar-view/event-large/event-large.component.ts ***!
  \********************************************************************/
/*! exports provided: EventLargeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventLargeComponent", function() { return EventLargeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_schedule_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/schedule.service */ "./src/app/services/schedule.service.ts");
/* harmony import */ var src_app_services_team_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/team.service */ "./src/app/services/team.service.ts");
/* harmony import */ var src_app_services_utilities_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/utilities.service */ "./src/app/services/utilities.service.ts");
/* harmony import */ var src_app_services_standings_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/standings.service */ "./src/app/services/standings.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var EventLargeComponent = /** @class */ (function () {
    function EventLargeComponent(router, scheduleService, team, util, standingsService) {
        this.router = router;
        this.scheduleService = scheduleService;
        this.team = team;
        this.util = util;
        this.standingsService = standingsService;
        if (this.router.snapshot.params['id']) {
            this.id = this.router.snapshot.params['id'];
        }
    }
    EventLargeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.scheduleService.getMatchInfo(6, this.id).subscribe(function (res) {
            _this.match = res;
            var match = res;
            var div = _this.match.divisionConcat;
            _this.standingsService.getStandings(div).subscribe(function (res) {
                var standings = res;
                standings.forEach(function (standing) {
                    if (match.home.teamName == standing.teamName) {
                        match.home['losses'] = standing.losses;
                        match.home['wins'] = standing.wins;
                    }
                    if (match.away.teamName == standing.teamName) {
                        match.away['losses'] = standing.losses;
                        match.away['wins'] = standing.wins;
                    }
                });
                if (match.scheduledTime) {
                    match['friendlyDate'] = _this.util.getDateFromMS(match.scheduledTime.startTime);
                    match['friendlyTime'] = _this.util.getTimeFromMS(match.scheduledTime.startTime);
                    match['suffix'] = _this.util.getSuffixFromMS(match.scheduledTime.startTime);
                }
            }, function (err) {
                console.log(err);
            });
        }, function (err) {
            console.log(err);
        });
    };
    EventLargeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-event-large',
            template: __webpack_require__(/*! ./event-large.component.html */ "./src/app/calendar-view/event-large/event-large.component.html"),
            styles: [__webpack_require__(/*! ./event-large.component.css */ "./src/app/calendar-view/event-large/event-large.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], src_app_services_schedule_service__WEBPACK_IMPORTED_MODULE_2__["ScheduleService"], src_app_services_team_service__WEBPACK_IMPORTED_MODULE_3__["TeamService"], src_app_services_utilities_service__WEBPACK_IMPORTED_MODULE_4__["UtilitiesService"], src_app_services_standings_service__WEBPACK_IMPORTED_MODULE_5__["StandingsService"]])
    ], EventLargeComponent);
    return EventLargeComponent;
}());



/***/ }),

/***/ "./src/app/calendar-view/event-modal/event-modal.component.css":
/*!*********************************************************************!*\
  !*** ./src/app/calendar-view/event-modal/event-modal.component.css ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/calendar-view/event-modal/event-modal.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/calendar-view/event-modal/event-modal.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col\">\n        <div class=\"row\">\n            <div class=\"col\">\n                Match Details\n            </div>\n            <div class=\"col\">\n\n            </div>\n        </div>\n        <div class=\"row\">\n            <!-- <div class=\"col\">{{data.home.teamName}}</div>\n            <div class=\"col\">{{data.away.teamName}}</div> -->\n        </div>\n        <div class=\"row\">\n            <div class=\"col\">\n                Schedule\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col\">\n                Caster Info\n            </div>\n        </div>\n    </div>\n</div>\n<mat-dialog-actions align=\"end\">\n    <button mat-button mat-dialog-close>Close</button>\n</mat-dialog-actions>"

/***/ }),

/***/ "./src/app/calendar-view/event-modal/event-modal.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/calendar-view/event-modal/event-modal.component.ts ***!
  \********************************************************************/
/*! exports provided: EventModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventModalComponent", function() { return EventModalComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var EventModalComponent = /** @class */ (function () {
    function EventModalComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        console.log(data);
    }
    EventModalComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    EventModalComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-event-modal',
            template: __webpack_require__(/*! ./event-modal.component.html */ "./src/app/calendar-view/event-modal/event-modal.component.html"),
            styles: [__webpack_require__(/*! ./event-modal.component.css */ "./src/app/calendar-view/event-modal/event-modal.component.css")]
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object])
    ], EventModalComponent);
    return EventModalComponent;
}());



/***/ }),

/***/ "./src/app/caster-tools/caster-dashboard/caster-dashboard.component.css":
/*!******************************************************************************!*\
  !*** ./src/app/caster-tools/caster-dashboard/caster-dashboard.component.css ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/caster-tools/caster-dashboard/caster-dashboard.component.html":
/*!*******************************************************************************!*\
  !*** ./src/app/caster-tools/caster-dashboard/caster-dashboard.component.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <div>\n        <div class=\"row\">\n            <div class=\"col\">\n\n                <div class=\"row\">\n                    <div class=\"col\">\n                        <h2>Caster Dashboard</h2>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col\">\n                        <h5>Filter Matches By:</h5>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col\">\n                        <mat-form-field class=\"mat-FullWidth\">\n                            <mat-select placeholder=\"Division:\" [(ngModel)]=\"selectedDivision\" (ngModelChange)=\"doFilterMatches(selectedDivision, selectedRound, filterTeam)\" disableOptionCentering>\n                                <mat-option [value]=\"null\"> </mat-option>\n                                <mat-option *ngFor=\"let division of divisions; let i = index\" [value]=\"division.divisionConcat\">{{division.displayName}}</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                    <div class=\"col\">\n                        <mat-form-field class=\"mat-FullWidth\">\n                            <mat-select placeholder=\"Round:\" [(ngModel)]=\"selectedRound\" (ngModelChange)=\"doFilterMatches(selectedDivision, selectedRound, filterTeam)\" disableOptionCentering>\n                                <mat-option [value]=\"null\"> </mat-option>\n                                <mat-option *ngFor=\"let round of rounds\" [value]=\"round\">{{round}}</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                    <div class=\"col\">\n                        <mat-form-field class=\"mat-FullWidth\">\n                            <input matInput placeholder=\"Team Name\" [(ngModel)]=\"filterTeam\" (ngModelChange)=\"doFilterMatches(selectedDivision, selectedRound, filterTeam)\">\n                        </mat-form-field>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col\">\n                        <mat-checkbox [(ngModel)]=\"scheduledOnly\" (ngModelChange)=\"filterScheduled(scheduledOnly)\">Only Scheduled Matches.</mat-checkbox>\n                    </div>\n                </div>\n                <mat-paginator [length]=\"length\" [pageIndex]=\"pageIndex\" [pageSize]=\"pageSize\" (page)=\"pageEventHandler($event)\">\n\n                </mat-paginator>\n                <div *ngIf=\"displayArray.length==0\" style=\"height: 650px\"></div>\n                <div class=\"row mb-3 p-4\" *ngFor=\"let match of displayArray; let ind = index\" [ngClass]=\"{'bg-light':ind%2==0}\">\n                    <div class=\"col\">\n                        <div class=\"row\">\n                            <div class=\"col\">\n                                {{match.divisionDisplayName}}\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col\">\n                                {{match.home.teamName}}\n                            </div>\n                            <div class=\"col\">\n                                -VS-\n                            </div>\n                            <div class=\"col\">\n                                {{match.away.teamName}}\n                            </div>\n                        </div>\n                        <div class=\"row mt-2\">\n                            <div class=\"col\">\n                                Scheduled Time: <span *ngIf=\"match.scheduledTime !=undefined && match.scheduledTime !=null else notScheduled\">{{displayTime(match.scheduledTime.startTime)}}</span>\n                                <ng-template #notScheduled>\n                                    <span>Not Yet Scheduled</span>\n                                </ng-template>\n                            </div>\n                        </div>\n                        <div class=\"row mt-2\">\n                            <div class=\"col\">\n                                <div *ngIf=\"match.casterName != undefined && match.casterName != null else addCasterButton\">\n                                    Caster: {{match.casterName}} Url: {{match.casterUrl}}\n                                </div>\n                                <ng-template #addCasterButton>\n                                    <app-caster-inputs [matchId]=\"match.matchId\"></app-caster-inputs>\n                                </ng-template>\n                            </div>\n                        </div>\n\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/caster-tools/caster-dashboard/caster-dashboard.component.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/caster-tools/caster-dashboard/caster-dashboard.component.ts ***!
  \*****************************************************************************/
/*! exports provided: CasterDashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CasterDashboardComponent", function() { return CasterDashboardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_schedule_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/schedule.service */ "./src/app/services/schedule.service.ts");
/* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CasterDashboardComponent = /** @class */ (function () {
    function CasterDashboardComponent(scheduleService, adminService) {
        this.scheduleService = scheduleService;
        this.adminService = adminService;
        this.hideForm = true;
        this.rounds = [];
        this.divisions = [];
        this.filterTeam = '';
        this.scheduledOnly = false;
        this.displayArray = [];
        this.pageSize = 10;
        this.filteredArray = [];
    }
    CasterDashboardComponent.prototype.ngAfterViewInit = function () {
        this.paginator.pageIndex = 0;
    };
    CasterDashboardComponent.prototype.pageEventHandler = function (pageEvent) {
        console.log(pageEvent);
        var i = pageEvent.pageIndex * this.pageSize;
        var endSlice = i + this.pageSize;
        if (endSlice > this.filterMatches.length) {
            endSlice = this.filterMatches.length;
        }
        console.log('index start ', i, ' endSlice ', endSlice);
        this.displayArray = [];
        this.displayArray = this.filterMatches.slice(i, endSlice);
    };
    CasterDashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.adminService.getDivisionList().subscribe(function (res) {
            _this.divisions = res;
            _this.scheduleService.getAllMatches().subscribe(function (sched) {
                _this.originalMatches = sched;
                _this.length = sched.length;
                _this.filterMatches = sched;
                _this.filterMatches.forEach(function (match) {
                    match.submitCaster = {
                        "name": '',
                        "URL": ''
                    };
                    if (_this.rounds.indexOf(match.round) < 0) {
                        _this.rounds.push(match.round);
                    }
                });
                _this.rounds = _this.rounds.sort();
                _this.displayArray = _this.filterMatches.slice(0, 10);
            });
        }, function (err) {
            console.log(err);
        });
    };
    /*
   div, round, team
   div, round,
   div, team,
   round, team,
   div,
   round,
   team
   */
    //filters the matches based on selected criteria
    CasterDashboardComponent.prototype.doFilterMatches = function (div, round, team) {
        // console.log('div ', div, ' round ', round, ' team ', team);
        this.filterMatches = this.originalMatches.filter(function (match) {
            var home, away;
            if (!match.away.teamName) {
                away = '';
            }
            else {
                away = match.away.teamName.toLowerCase();
            }
            if (!match.home.teamName) {
                home = '';
            }
            else {
                home = match.home.teamName.toLowerCase();
            }
            if (team) {
                team = team.toLowerCase();
            }
            var pass = false;
            if (div && round && team) {
                if (div == match.divisionConcat && round == match.round &&
                    (away.indexOf(team) > -1 || home.indexOf(team) > -1)) {
                    pass = true;
                }
            }
            else if (div && round) {
                if (div == match.divisionConcat && round == match.round) {
                    pass = true;
                }
            }
            else if (div && team) {
                if (div == match.divisionConcat && (away.indexOf(team) > -1 || home.indexOf(team) > -1)) {
                    pass = true;
                }
            }
            else if (round && team) {
                if (round == match.round && (away.indexOf(team) > -1 || home.indexOf(team) > -1)) {
                    pass = true;
                }
            }
            else if (div) {
                if (div == match.divisionConcat) {
                    pass = true;
                }
            }
            else if (round) {
                if (round == match.round) {
                    pass = true;
                }
            }
            else if (team) {
                if (away.indexOf(team) > -1 || home.indexOf(team) > -1) {
                    pass = true;
                }
            }
            else {
                pass = true;
            }
            return pass;
        });
        this.length = this.filterMatches.length;
        this.displayArray = this.filterMatches.slice(0, this.pageSize > this.length ? this.length : this.pageSize);
        this.paginator.firstPage();
    };
    CasterDashboardComponent.prototype.filterScheduled = function (filter) {
        if (filter) {
            this.filterMatches = this.originalMatches.filter(function (match) {
                var pass = false;
                if (match.scheduledTime) {
                    if (match.scheduledTime.startTime != undefined || match.scheduledTime.startTime != null) {
                        pass = true;
                    }
                }
                return pass;
            });
            this.length = this.filterMatches.length;
            this.displayArray = this.filterMatches.slice(0, this.pageSize > this.length ? this.length : this.pageSize);
            this.paginator.pageIndex = 0;
        }
        else {
            this.filterMatches = this.originalMatches;
            this.length = this.filterMatches.length;
            this.displayArray = this.filterMatches.slice(0, this.pageSize > this.length ? this.length : this.pageSize);
            this.paginator.pageIndex = 0;
        }
    };
    CasterDashboardComponent.prototype.displayTime = function (ms) {
        var d = new Date(parseInt(ms));
        var day = d.getDate();
        var year = d.getFullYear();
        var month = d.getMonth();
        month = month + 1;
        var hours = d.getHours();
        var suffix = "AM";
        if (hours > 12) {
            hours = hours - 12;
            suffix = "PM";
        }
        var min = d.getMinutes();
        var minStr;
        if (min == 0) {
            minStr = '00';
        }
        else {
            minStr = min.toString();
        }
        var dateTime = month + '/' + day + '/' + year + ' @ ' + hours + ':' + minStr + " " + suffix;
        return dateTime;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatPaginator"])
    ], CasterDashboardComponent.prototype, "paginator", void 0);
    CasterDashboardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-caster-dashboard',
            template: __webpack_require__(/*! ./caster-dashboard.component.html */ "./src/app/caster-tools/caster-dashboard/caster-dashboard.component.html"),
            styles: [__webpack_require__(/*! ./caster-dashboard.component.css */ "./src/app/caster-tools/caster-dashboard/caster-dashboard.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_services_schedule_service__WEBPACK_IMPORTED_MODULE_1__["ScheduleService"], src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_2__["AdminService"]])
    ], CasterDashboardComponent);
    return CasterDashboardComponent;
}());



/***/ }),

/***/ "./src/app/caster-tools/caster-dashboard/caster-inputs/caster-inputs.component.css":
/*!*****************************************************************************************!*\
  !*** ./src/app/caster-tools/caster-dashboard/caster-inputs/caster-inputs.component.css ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/caster-tools/caster-dashboard/caster-inputs/caster-inputs.component.html":
/*!******************************************************************************************!*\
  !*** ./src/app/caster-tools/caster-dashboard/caster-inputs/caster-inputs.component.html ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col text-center\">\n        <button class=\"btn btn-info\" (click)=\"hideForm = !hideForm\"> Add Caster </button>\n    </div>\n</div>\n<div [hidden]=\"hideForm\" class=\"row\">\n    <div class=\"col\">\n        <mat-form-field class=\"mat-FullWidth\">\n            <input matInput [formControl]=\"casterNameControl\" placeholder=\"Caster Name\" [(ngModel)]=\"name\">\n            <mat-error *ngIf=\"casterNameControl.hasError('required')\">\n                Caster Name is required\n            </mat-error>\n        </mat-form-field>\n    </div>\n    <div class=\"col\">\n        <mat-form-field class=\"mat-FullWidth\">\n            <input matInput [formControl]=\"casterUrlControl\" placeholder=\"Caster URL\" [(ngModel)]=\"URL\">\n            <mat-error *ngIf=\"casterUrlControl.hasError('required')\">\n                Caster URL is required\n            </mat-error>\n        </mat-form-field>\n    </div>\n    <div class=\"col\">\n        <button class=\"btn btn-success\" [disabled]=\"casterInputForm.invalid\" (click)=\"saveCasterInfo(name, URL)\">Submit</button>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/caster-tools/caster-dashboard/caster-inputs/caster-inputs.component.ts":
/*!****************************************************************************************!*\
  !*** ./src/app/caster-tools/caster-dashboard/caster-inputs/caster-inputs.component.ts ***!
  \****************************************************************************************/
/*! exports provided: CasterInputsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CasterInputsComponent", function() { return CasterInputsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_services_schedule_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/schedule.service */ "./src/app/services/schedule.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CasterInputsComponent = /** @class */ (function () {
    function CasterInputsComponent(scheduleService) {
        this.scheduleService = scheduleService;
        this.hideForm = true;
        this.casterNameControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', [
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required
        ]);
        this.casterUrlControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', [
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required
        ]);
        this.casterInputForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            name: this.casterNameControl,
            url: this.casterUrlControl,
        });
    }
    Object.defineProperty(CasterInputsComponent.prototype, "matchId", {
        set: function (id) {
            if (id != null && id != undefined) {
                this._id = id;
            }
        },
        enumerable: true,
        configurable: true
    });
    CasterInputsComponent.prototype.ngOnInit = function () {
    };
    CasterInputsComponent.prototype.saveCasterInfo = function (casterName, casterUrl) {
        var matchId;
        if (this._id != null && this._id != undefined) {
            matchId = this._id;
            if (casterName != null && casterName != undefined) {
                if (casterUrl != null && casterUrl != undefined) {
                    this.scheduleService.addCaster(matchId, casterName, casterUrl).subscribe(function (res) {
                    }, function (err) {
                    });
                }
                else {
                    alert('Null Caster Url');
                }
            }
            else {
                alert('Null Caster Name');
            }
        }
        else {
            alert('Null MatchId');
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CasterInputsComponent.prototype, "matchId", null);
    CasterInputsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-caster-inputs',
            template: __webpack_require__(/*! ./caster-inputs.component.html */ "./src/app/caster-tools/caster-dashboard/caster-inputs/caster-inputs.component.html"),
            styles: [__webpack_require__(/*! ./caster-inputs.component.css */ "./src/app/caster-tools/caster-dashboard/caster-inputs/caster-inputs.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_services_schedule_service__WEBPACK_IMPORTED_MODULE_2__["ScheduleService"]])
    ], CasterInputsComponent);
    return CasterInputsComponent;
}());



/***/ }),

/***/ "./src/app/classes/aM-input-Import.class.ts":
/*!**************************************************!*\
  !*** ./src/app/classes/aM-input-Import.class.ts ***!
  \**************************************************/
/*! exports provided: InputFormMaterial */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputFormMaterial", function() { return InputFormMaterial; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/checkbox */ "./node_modules/@angular/material/esm5/checkbox.es5.js");
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/grid-list */ "./node_modules/@angular/material/esm5/grid-list.es5.js");
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/slide-toggle */ "./node_modules/@angular/material/esm5/slide-toggle.es5.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/expansion */ "./node_modules/@angular/material/esm5/expansion.es5.js");
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/autocomplete */ "./node_modules/@angular/material/esm5/autocomplete.es5.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/tabs */ "./node_modules/@angular/material/esm5/tabs.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



















var InputFormMaterial = /** @class */ (function () {
    function InputFormMaterial() {
    }
    InputFormMaterial = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatInputModule"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatFormFieldModule"], _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_2__["MatCheckboxModule"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSliderModule"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDatepickerModule"], _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_3__["MatGridListModule"], _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_4__["MatSlideToggleModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_5__["MatButtonModule"], _angular_material_card__WEBPACK_IMPORTED_MODULE_6__["MatCardModule"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_7__["MatExpansionModule"], _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_8__["MatAutocompleteModule"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_9__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatRadioModule"], _angular_material_tabs__WEBPACK_IMPORTED_MODULE_10__["MatTabsModule"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatNativeDateModule"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBarModule"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginatorModule"]],
            exports: [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatInputModule"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatFormFieldModule"], _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_2__["MatCheckboxModule"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSliderModule"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDatepickerModule"], _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_3__["MatGridListModule"], _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_4__["MatSlideToggleModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_5__["MatButtonModule"], _angular_material_card__WEBPACK_IMPORTED_MODULE_6__["MatCardModule"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_7__["MatExpansionModule"], _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_8__["MatAutocompleteModule"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_9__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatRadioModule"], _angular_material_tabs__WEBPACK_IMPORTED_MODULE_10__["MatTabsModule"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatNativeDateModule"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBarModule"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginatorModule"]]
        })
    ], InputFormMaterial);
    return InputFormMaterial;
}());



/***/ }),

/***/ "./src/app/classes/profile.class.ts":
/*!******************************************!*\
  !*** ./src/app/classes/profile.class.ts ***!
  \******************************************/
/*! exports provided: Profile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Profile", function() { return Profile; });
var Profile = /** @class */ (function () {
    function Profile(id, displayName, teamId, teamName, isCaptain, hlRankMetal, hlRankDivision, lookingForGroup, availability, competitiveLevel, descriptionOfPlay, role, timeZone, hotsLogsURL, averageMmr, toonId, discordTag) {
        if (id != null && id != undefined && id.length > 0) {
            this._id = id;
        }
        else {
            this._id = "";
        }
        if (displayName != null && displayName != undefined && displayName.length > 0) {
            this.displayName = displayName;
        }
        else {
            this.displayName = "";
        }
        if (teamId != null && teamId != undefined && teamId.length > 0) {
            this.teamId = teamId;
        }
        else {
            this.teamId = "";
        }
        if (teamName != null && teamName != undefined && teamName.length > 0) {
            this.teamName = teamName;
        }
        else {
            this.teamName = "";
        }
        if (isCaptain != null && isCaptain != undefined) {
            this.isCaptain = isCaptain;
        }
        else {
            this.isCaptain = null;
        }
        if (hlRankMetal != null && hlRankMetal != undefined && hlRankMetal.length > 0) {
            this.hlRankMetal = hlRankMetal;
        }
        else {
            this.hlRankMetal = "";
        }
        if (hlRankDivision != null && hlRankDivision != undefined) {
            this.hlRankDivision = hlRankDivision;
        }
        else {
            this.hlRankDivision = null;
        }
        if (lookingForGroup != null && lookingForGroup != undefined) {
            this.lookingForGroup = lookingForGroup;
        }
        else {
            this.lookingForGroup = false;
        }
        if (availability != null && availability != undefined) {
            this.availability = availability;
        }
        else {
            this.availability = {
                "monday": {
                    "available": false,
                    "startTime": null,
                    "endTime": null
                },
                "tuesday": {
                    "available": false,
                    "startTime": null,
                    "endTime": null
                },
                "wednesday": {
                    "available": false,
                    "startTime": null,
                    "endTime": null
                },
                "thursday": {
                    "available": false,
                    "startTime": null,
                    "endTime": null
                },
                "friday": {
                    "available": false,
                    "startTime": null,
                    "endTime": null
                },
                "saturday": {
                    "available": false,
                    "startTime": null,
                    "endTime": null
                },
                "sunday": {
                    "available": false,
                    "startTime": null,
                    "endTime": null
                }
            };
        }
        if (competitiveLevel != null && competitiveLevel != undefined) {
            this.competitiveLevel = competitiveLevel;
        }
        else {
            this.competitiveLevel = null;
        }
        if (descriptionOfPlay != null && descriptionOfPlay != undefined) {
            this.descriptionOfPlay = descriptionOfPlay;
        }
        else {
            this.descriptionOfPlay = null;
        }
        if (role != null && role != undefined) {
            this.role = role;
        }
        else {
            this.role = { "tank": false, "meleeassassin": false, "rangedassassin": false, "support": false, "offlane": false, "flex": false };
        }
        if (timeZone != null && timeZone != undefined) {
            this.timeZone = timeZone;
        }
        else {
            this.timeZone = '';
        }
        if (hotsLogsURL != null && hotsLogsURL != undefined) {
            this.hotsLogsURL = hotsLogsURL;
        }
        else {
            this.hotsLogsURL = null;
        }
        if (averageMmr != null && averageMmr != undefined) {
            this.averageMmr = averageMmr;
        }
        else {
            this.averageMmr = null;
        }
        if (toonId != null && toonId != undefined) {
            this.toonId = toonId;
        }
        else {
            this.toonId = null;
        }
        if (discordTag != null && discordTag != undefined) {
            this.discordTag = toonId;
        }
        else {
            this.discordTag = null;
        }
    }
    return Profile;
}());



/***/ }),

/***/ "./src/app/classes/team.class.ts":
/*!***************************************!*\
  !*** ./src/app/classes/team.class.ts ***!
  \***************************************/
/*! exports provided: Team */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Team", function() { return Team; });
var Team = /** @class */ (function () {
    function Team(id, logo, teamName, lookingForMore, availability, competitiveLevel, rolesNeeded, descriptionOfTeam, timeZone, teamMembers, pendingMembers, captain, teamMMRAvg, divisionDisplayName, divisionConcat, questionnaire) {
        if (id != null && id != undefined && id.length > 0) {
            this._id = id;
        }
        else {
            this._id = "";
        }
        if (teamName != null && teamName != undefined && teamName.length > 0) {
            this.teamName = teamName;
            this.teamName_lower = teamName.toLowerCase();
        }
        else {
            this.teamName, this.teamName_lower = "";
        }
        if (lookingForMore != null && lookingForMore != undefined) {
            this.lookingForMore = lookingForMore;
        }
        else {
            this.lookingForMore = false;
        }
        if (availability != null && availability != undefined) {
            this.availability = availability;
        }
        else {
            this.availability = {
                "monday": {
                    "available": false,
                    "startTime": null,
                    "endTime": null
                },
                "tuesday": {
                    "available": false,
                    "startTime": null,
                    "endTime": null
                },
                "wednesday": {
                    "available": false,
                    "startTime": null,
                    "endTime": null
                },
                "thursday": {
                    "available": false,
                    "startTime": null,
                    "endTime": null
                },
                "friday": {
                    "available": false,
                    "startTime": null,
                    "endTime": null
                },
                "saturday": {
                    "available": false,
                    "startTime": null,
                    "endTime": null
                },
                "sunday": {
                    "available": false,
                    "startTime": null,
                    "endTime": null
                }
            };
        }
        if (competitiveLevel != null && competitiveLevel != undefined) {
            this.competitiveLevel = competitiveLevel;
        }
        else {
            this.competitiveLevel = null;
        }
        if (descriptionOfTeam != null && descriptionOfTeam != undefined) {
            this.descriptionOfTeam = descriptionOfTeam;
        }
        else {
            this.descriptionOfTeam = null;
        }
        if (rolesNeeded != null && rolesNeeded != undefined) {
            this.rolesNeeded = rolesNeeded;
        }
        else {
            this.rolesNeeded = { "tank": false, "meleeassassin": false, "rangedassassin": false, "support": false, "offlane": false, "flex": false };
        }
        if (timeZone != null && timeZone != undefined) {
            this.timeZone = timeZone;
        }
        else {
            this.timeZone = "";
        }
        if (teamMembers != null && teamMembers != undefined) {
            this.teamMembers = teamMembers;
        }
        else {
            this.teamMembers = null;
        }
        if (pendingMembers != null && pendingMembers != undefined) {
            this.pendingMembers = pendingMembers;
        }
        else {
            this.pendingMembers = null;
        }
        if (captain != null && captain != undefined) {
            this.captain = captain;
        }
        else {
            this.captain = null;
        }
        if (teamMMRAvg != null && teamMMRAvg != undefined) {
            this.teamMMRAvg = teamMMRAvg;
        }
        else {
            this.teamMMRAvg = 0;
        }
        if (divisionDisplayName != null && divisionDisplayName != undefined) {
            this.divisionDisplayName = divisionDisplayName;
        }
        else {
            this.divisionDisplayName = null;
        }
        if (divisionConcat != null && divisionConcat != undefined) {
            this.divisionConcat = divisionConcat;
        }
        else {
            this.divisionConcat = null;
        }
        if (questionnaire != null && questionnaire != undefined) {
            this.questionnaire = questionnaire;
        }
        else {
            this.questionnaire = {
                pickedMaps: []
            };
        }
    }
    return Team;
}());



/***/ }),

/***/ "./src/app/create-team/create-team.component.css":
/*!*******************************************************!*\
  !*** ./src/app/create-team/create-team.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".role-margin {\n    margin: 0 10px;\n}\n\n.error-avail {\n    border-style: solid;\n    border-width: 2px;\n    border-color: red;\n    padding-left: 10px;\n}\n\n.req-field {\n    color: red;\n    font-size: .80em;\n    font-weight: 600;\n}"

/***/ }),

/***/ "./src/app/create-team/create-team.component.html":
/*!********************************************************!*\
  !*** ./src/app/create-team/create-team.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <div class=\"row\">\n        <div class=\"col-md-12\">\n\n            <div class=\"row mt-3\">\n                <div class=\"col\">\n                    <mat-form-field class=\"mat-FullWidth\">\n                        <input matInput placeholder=\"Team Name*\" [formControl]=\"nameContorl\" [(ngModel)]=\"returnedProfile.teamName\">\n                        <mat-error *ngIf=\"nameContorl.hasError('required')\">\n                            Team name is required\n                        </mat-error>\n                        <mat-error *ngIf=\"nameContorl.hasError('invalidCharacters')\">\n                            Special characters are not allowed in team names\n                        </mat-error>\n                    </mat-form-field>\n                    <mat-slide-toggle [(ngModel)]=\"returnedProfile.lookingForMore\">\n                        Looking for More.\n                    </mat-slide-toggle>\n                </div>\n            </div>\n\n            <mat-form-field class=\"mat-FullWidth\">\n                <mat-select placeholder=\"Team Competitive Level\" [(ngModel)]=\"returnedProfile.competitiveLevel\" disableOptionCentering>\n                    <mat-option *ngFor=\"let level of competitonLevel\" [value]=\"level.val\">\n                        {{level.display}}\n                    </mat-option>\n                </mat-select>\n                <mat-hint align=\"start\"><strong>Generally how serious / competitively you're looking to play</strong>\n                </mat-hint>\n            </mat-form-field>\n\n            <!-- <div class=\"row mt-2\">\n                    <div class=\"col\"> -->\n            <mat-form-field class=\"mat-FullWidth\">\n                <mat-label>Describe the teams play history / style</mat-label>\n                <textarea matInput cdkTextareaAutosize [(ngModel)]=\"returnedProfile.descriptionOfTeam\"></textarea>\n            </mat-form-field>\n            <!-- </div>\n                </div> -->\n            <div class=\"row mt-3\">\n                <div class=\"col\">\n                    Roles the team needs:\n                    <section>\n                        <mat-checkbox class=\"role-margin\" [(ngModel)]=\"returnedProfile.rolesNeeded.tank\">Tank</mat-checkbox>\n                        <mat-checkbox class=\"role-margin\" [(ngModel)]=\"returnedProfile.rolesNeeded.offlane\">Offlane</mat-checkbox>\n                        <mat-checkbox class=\"role-margin\" [(ngModel)]=\"returnedProfile.rolesNeeded.meleeassassin\">Melee Assassin</mat-checkbox>\n                        <mat-checkbox class=\"role-margin\" [(ngModel)]=\"returnedProfile.rolesNeeded.rangedassassin\">Ranged Assassin</mat-checkbox>\n                        <mat-checkbox class=\"role-margin\" [(ngModel)]=\"returnedProfile.rolesNeeded.support\">Support</mat-checkbox>\n                        <mat-checkbox class=\"role-margin\" [(ngModel)]=\"returnedProfile.rolesNeeded.flex\">Flex</mat-checkbox>\n                    </section>\n                </div>\n            </div>\n            <!-- Availability Schedule -->\n            <app-times-available [availObj]=\"returnedProfile.availability\" (availValid)=\"receiveTimesValidity($event)\"></app-times-available>\n\n            <div class=\"row mt-3\">\n                <div class=\"col\">\n                    <mat-form-field class=\"mat-FullWidth\">\n                        <mat-select placeholder=\"Timezone:*\" [formControl]=\"timeZoneControl\" [(ngModel)]=\"returnedProfile.timeZone\">\n                            <mat-option *ngFor=\"let zone of timezone.timezones\" [value]=\"zone.value\">\n                                {{zone.text}}\n                            </mat-option>\n                        </mat-select>\n                        <mat-error *ngIf=\"timeZoneControl.hasError('required')\">\n                            Timezone is required\n                        </mat-error>\n                    </mat-form-field>\n                </div>\n            </div>\n            <div class=\"row mt-3 mb-3\">\n\n                <div class=\"col\">\n                    <button type=\"button\" [disabled]=\"!validate()\" (click)=\"save()\" class=\"btn btn-success \">Save</button>\n                </div>\n                <div class=\"col\">\n                    <button type=\"button\" (click)=\"cancel()\" class=\"btn btn-danger\">Cancel</button>\n                </div>\n\n\n            </div>\n\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/create-team/create-team.component.ts":
/*!******************************************************!*\
  !*** ./src/app/create-team/create-team.component.ts ***!
  \******************************************************/
/*! exports provided: CreateTeamComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateTeamComponent", function() { return CreateTeamComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _classes_team_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../classes/team.class */ "./src/app/classes/team.class.ts");
/* harmony import */ var _services_team_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/team.service */ "./src/app/services/team.service.ts");
/* harmony import */ var _services_timezone_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/timezone.service */ "./src/app/services/timezone.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _services_utilities_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/utilities.service */ "./src/app/services/utilities.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var CreateTeamComponent = /** @class */ (function () {
    function CreateTeamComponent(team, timezone, auth, route, util) {
        this.team = team;
        this.timezone = timezone;
        this.auth = auth;
        this.route = route;
        this.util = util;
        this.hlMedals = ['Grand Master', 'Master', 'Diamond', 'Platinum', 'Gold', 'Silver', 'Bronze'];
        this.hlDivision = [1, 2, 3, 4, 5];
        this.competitonLevel = [
            { val: 1, display: 'Low' },
            { val: 3, display: 'Medium' },
            { val: 5, display: 'High' }
        ];
        this.nameContorl = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"]();
        this.timeZoneControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"]();
        this.createTeamControlGroup = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormGroup"]({
            nameControl: this.nameContorl,
            timeZone: this.timeZoneControl
        });
    }
    CreateTeamComponent.prototype.ngOnInit = function () {
        this.markFormGroupTouched(this.createTeamControlGroup);
        this.returnedProfile = new _classes_team_class__WEBPACK_IMPORTED_MODULE_1__["Team"](null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    };
    CreateTeamComponent.prototype.cancel = function () {
        this.returnedProfile = new _classes_team_class__WEBPACK_IMPORTED_MODULE_1__["Team"](null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    };
    CreateTeamComponent.prototype.receiveTimesValidity = function (event) {
        this.availabilityValid = event;
    };
    CreateTeamComponent.prototype.save = function () {
        var _this = this;
        var checkName = this.returnedProfile.teamName.toLowerCase();
        this.team.getTeam(checkName).subscribe(function (res) {
            if (res && res.teamName) {
                alert('Team name is taken!');
                _this.nameContorl.setErrors({ taken: true });
            }
            else {
                if (_this.validate()) {
                    _this.returnedProfile.teamName_lower = checkName;
                    _this.team.createTeam(_this.returnedProfile).subscribe(function (res) {
                        _this.auth.setCaptain('true');
                        _this.auth.setTeam(res.teamName_lower);
                        // go to the team profile page.
                        _this.route.navigate(['/teamProfile', _this.team.routeFriendlyTeamName(res.teamName)]);
                    }, function (err) {
                        console.log(err);
                    });
                }
                else {
                    alert('required infomation not included');
                }
            }
        });
    };
    CreateTeamComponent.prototype.markFormGroupTouched = function (formGroup) {
        if (formGroup.controls) {
            var keys = Object.keys(formGroup.controls);
            for (var i = 0; i < keys.length; i++) {
                var control = formGroup.controls[keys[i]];
                if (control instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"]) {
                    control.markAsTouched();
                }
                else if (control instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormGroup"]) {
                    this.markFormGroupTouched(control);
                }
            }
        }
    };
    CreateTeamComponent.prototype.validate = function () {
        var valid = true;
        //validate team name is there
        if (!this.util.returnBoolByPath(this.returnedProfile, 'teamName')) {
            this.nameContorl.setErrors({ required: true });
            valid = false;
        }
        else {
            var regEx = new RegExp(/[^A-Z0-9\s]/ig);
            if (regEx.test(this.returnedProfile.teamName)) {
                this.nameContorl.setErrors({ invalidCharacters: true });
            }
            else {
                this.nameContorl.setErrors(null);
            }
        }
        //validate looking for team:
        if (!this.util.returnBoolByPath(this.returnedProfile, 'lookingForMore')) {
            valid = false;
        }
        //validate that there is at least 1 available day
        if (!this.availabilityValid) {
            valid = false;
        }
        //ensure time zone
        if (!this.util.returnBoolByPath(this.returnedProfile, 'timeZone')) {
            this.timeZoneControl.setErrors({ required: true });
            valid = false;
        }
        else {
            this.timeZoneControl.setErrors(null);
        }
        return valid;
    };
    CreateTeamComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-create-team',
            template: __webpack_require__(/*! ./create-team.component.html */ "./src/app/create-team/create-team.component.html"),
            styles: [__webpack_require__(/*! ./create-team.component.css */ "./src/app/create-team/create-team.component.css")]
        }),
        __metadata("design:paramtypes", [_services_team_service__WEBPACK_IMPORTED_MODULE_2__["TeamService"], _services_timezone_service__WEBPACK_IMPORTED_MODULE_3__["TimezoneService"], _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"], _services_utilities_service__WEBPACK_IMPORTED_MODULE_7__["UtilitiesService"]])
    ], CreateTeamComponent);
    return CreateTeamComponent;
}());



/***/ }),

/***/ "./src/app/directory/directory.component.css":
/*!***************************************************!*\
  !*** ./src/app/directory/directory.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/directory/directory.component.html":
/*!****************************************************!*\
  !*** ./src/app/directory/directory.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  directory works!\n</p>\n"

/***/ }),

/***/ "./src/app/directory/directory.component.ts":
/*!**************************************************!*\
  !*** ./src/app/directory/directory.component.ts ***!
  \**************************************************/
/*! exports provided: DirectoryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DirectoryComponent", function() { return DirectoryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DirectoryComponent = /** @class */ (function () {
    function DirectoryComponent() {
    }
    DirectoryComponent.prototype.ngOnInit = function () {
    };
    DirectoryComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-directory',
            template: __webpack_require__(/*! ./directory.component.html */ "./src/app/directory/directory.component.html"),
            styles: [__webpack_require__(/*! ./directory.component.css */ "./src/app/directory/directory.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], DirectoryComponent);
    return DirectoryComponent;
}());



/***/ }),

/***/ "./src/app/division/division.component.css":
/*!*************************************************!*\
  !*** ./src/app/division/division.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/* #wrapper {\n    padding: 16px;\n    min-height: 100%;\n    height: 100%;\n    box-sizing: border-box;\n} */\n\n#tab-group {\n    /* height: 100%; */\n    min-height: 100vh;\n}\n\n#tab-group mat-tab-body {\n    flex-grow: 1;\n}\n\n.mat-tab-body-wrapper {\n    height: 100%;\n}"

/***/ }),

/***/ "./src/app/division/division.component.html":
/*!**************************************************!*\
  !*** ./src/app/division/division.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"myDiv\" class=\"container\" style=\"height: 100%\">\n    <div class=\"row\">\n        <div class=\"col\">\n            <div id=\"wrapper\">\n                <mat-tab-group id=\"tab-group\" dynamicHeight class=\"mb-3\">\n                    <mat-tab label=\"Division\">\n                        <ng-template matTabContent>\n                            <div>\n                                <div class=\"row mt-3\">\n                                    <div class=\"col-md-12\">\n                                        <h2 class=\"text-center\">{{divDisplay.displayName}} </h2>\n                                    </div>\n                                </div>\n                                <div class=\"row\">\n                                    <div class=\"col\">\n                                        <app-team-display [teams]=\"teams\"></app-team-display>\n                                    </div>\n                                </div>\n                            </div>\n                        </ng-template>\n\n                    </mat-tab>\n                    <mat-tab label=\"Schedule\">\n                        <ng-template matTabContent>\n                            <app-schedule-view [division]=\"divDisplay\"></app-schedule-view>\n                        </ng-template>\n                    </mat-tab>\n                    <mat-tab label=\"Standings\">\n                        <ng-template matTabContent>\n                            <app-standings-view [division]=\"divDisplay\"></app-standings-view>\n                        </ng-template>\n                    </mat-tab>\n                </mat-tab-group>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/division/division.component.ts":
/*!************************************************!*\
  !*** ./src/app/division/division.component.ts ***!
  \************************************************/
/*! exports provided: DivisionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DivisionComponent", function() { return DivisionComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_division_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/division.service */ "./src/app/services/division.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_team_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/team.service */ "./src/app/services/team.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DivisionComponent = /** @class */ (function () {
    function DivisionComponent(division, teamService, route, router) {
        var _this = this;
        this.division = division;
        this.teamService = teamService;
        this.route = route;
        this.router = router;
        this.divDisplay = { displayName: '' };
        this.navigationSubscription = this.router.events.subscribe(function (e) {
            // If it is a NavigationEnd event re-initalise the component
            if (e instanceof _angular_router__WEBPACK_IMPORTED_MODULE_2__["NavigationEnd"]) {
                _this.param = _this.route.snapshot.params['division'];
                _this.initialise();
            }
        });
    }
    DivisionComponent.prototype.initialise = function () {
        var _this = this;
        this.divDisplay;
        this.teams = [];
        this.divSub = this.division.getDivision(this.param).subscribe(function (res) {
            if (res != undefined && res != null) {
                _this.divDisplay = res;
                if (res.teams && res.teams.length > 0) {
                    _this.teamService.getTeams(res.teams).subscribe(function (retn) {
                        _this.teams = retn;
                    }, function (error) {
                        console.log(error);
                    });
                }
            }
        }, function (err) {
            var arr = [];
            _this.teams = arr;
        });
    };
    DivisionComponent.prototype.ngOnInit = function () {
        this.initialise();
    };
    DivisionComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-division',
            template: __webpack_require__(/*! ./division.component.html */ "./src/app/division/division.component.html"),
            styles: [__webpack_require__(/*! ./division.component.css */ "./src/app/division/division.component.css")]
        }),
        __metadata("design:paramtypes", [_services_division_service__WEBPACK_IMPORTED_MODULE_1__["DivisionService"], _services_team_service__WEBPACK_IMPORTED_MODULE_3__["TeamService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], DivisionComponent);
    return DivisionComponent;
}());



/***/ }),

/***/ "./src/app/home/home.component.css":
/*!*****************************************!*\
  !*** ./src/app/home/home.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".carousel-item {\n    height: 65vh;\n    min-height: 300px;\n    background: no-repeat center center scroll;\n    background-size: cover;\n}\n\n.portfolio-item {\n    margin-bottom: 30px;\n}\n\n.mat-card {\n    background-color: #F26A2F;\n    color: white;\n}\n\n.m-t {\n    margin-top: 10px;\n}\n\n.mat-card-image {\n    background-color: white;\n}\n\n.anchor {\n    color: #482262;\n    text-decoration: underline;\n    font-weight: bold;\n    font-size: 16px;\n}\n\n.carousel-caption > h3, .carousel-caption > p {\n  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;\n}"

/***/ }),

/***/ "./src/app/home/home.component.html":
/*!******************************************!*\
  !*** ./src/app/home/home.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <div class=\"container nav-padding\"> -->\n\n\n<!-- Page Content -->\n<div class=\"backGround\">\n    <div class=\"container pb-4\">\n        <header>\n            <div id=\"carouselExampleIndicators\" class=\"carousel slide\" data-ride=\"carousel\">\n                <ol class=\"carousel-indicators\">\n                    <li data-target=\"#carouselExampleIndicators\" data-slide-to=\"0\" class=\"active\"></li>\n                    <li data-target=\"#carouselExampleIndicators\" data-slide-to=\"1\"></li>\n                    <li data-target=\"#carouselExampleIndicators\" data-slide-to=\"2\"></li>\n                </ol>\n                <div class=\"carousel-inner\" role=\"listbox\">\n                    <!-- Slide One - Set the background image for this slide in the line below -->\n                    <div (click)=\"goToBlogPage(jumboSlide)\" *ngFor=\"let jumboSlide of jumboTron let i = index\" class=\"carousel-item finger\" [ngClass]=\"{'active':i==0}\" [style.background-image]=\"'url('+jumboSlide.fields.heroImage.fields.file.url+'?w=1920&h=1080&fit=scale)'\">\n                        <div class=\"carousel-caption d-none d-md-block\">\n\n                            <h3>{{jumboSlide.fields.title}}</h3>\n                            <p>{{jumboSlide.fields.description}}</p>\n                        </div>\n                    </div>\n\n                    <a class=\"carousel-control-prev\" href=\"#carouselExampleIndicators\" role=\"button\" data-slide=\"prev\">\n                        <span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\n                        <span class=\"sr-only\">Previous</span>\n                    </a>\n                    <a class=\"carousel-control-next\" href=\"#carouselExampleIndicators\" role=\"button\" data-slide=\"next\">\n                        <span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\n                        <span class=\"sr-only\">Next</span>\n                    </a>\n                </div>\n            </div>\n        </header>\n\n        <h1 class=\"my-4 text-center\">Welcome to Nexus Gaming Series!</h1>\n\n        <h2>Recent news</h2>\n        <div class=\"row m-t\" *ngFor=\"let row of rows\">\n            <div class=\"col-4\" *ngFor=\"let item of row\">\n                <mat-card (click)=\"goToBlogPage(item)\" class=\"blog-card finger\">\n                    <mat-card-header>\n                        <img mat-card-avatar src=\"{{item.fields.author.fields.image.fields.file.url}}\" class=\"author-image\">\n                        <mat-card-title><span class=\"anchor\" (click)=\"goToBlogPage(item)\">{{item.fields.title}}</span></mat-card-title>\n                        <mat-card-subtitle>{{item.fields.author.fields.name}}</mat-card-subtitle>\n                    </mat-card-header>\n                    <img mat-card-image src=\"{{item.fields.heroImage.fields.file.url}}?w=400&h=300&fit=scale\" alt=\"{{item.fields.heroImage.fields.description}}\">\n                    <mat-card-content>\n                        <div>{{item.fields.description}}</div>\n                    </mat-card-content>\n                </mat-card>\n            </div>\n        </div>\n\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/home/home.component.ts":
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_contentful_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/contentful.service */ "./src/app/services/contentful.service.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomeComponent = /** @class */ (function () {
    function HomeComponent(contentfulService, router) {
        this.contentfulService = contentfulService;
        this.router = router;
        this.perColumn = 3;
        this.rows = [];
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.contentfulService.getBlogs((Object.assign({ content_type: 'blogPost' }, { links_to_entry: _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].contentful.categoryIDs.news, order: '-sys.createdAt', limit: 6 }))).then(function (res) {
            _this.createMyDisplay(res);
        });
        this, this.contentfulService.getBlogs((Object.assign({ content_type: 'blogPost' }, { links_to_entry: _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].contentful.categoryIDs.jumbotron, order: '-sys.createdAt', limit: 3 }))).then(function (res) {
            _this.jumboTron = res;
        });
    };
    HomeComponent.prototype.createMyDisplay = function (dat) {
        if (!this.perColumn) {
            this.perColumn = 3;
        }
        this.rows = [];
        if (dat != undefined && dat.length > 0) {
            if (dat.length > this.perColumn) {
                var temparr = [];
                for (var i = 0; i < dat.length; i++) {
                    if (i > 0 && i % this.perColumn == 0) {
                        this.rows.push(temparr);
                        temparr = [];
                    }
                    temparr.push(dat[i]);
                }
                if (temparr.length > 0) {
                    this.rows.push(temparr);
                }
            }
            else {
                this.rows.push(dat);
            }
        }
        else {
            this.rows = [];
        }
    };
    HomeComponent.prototype.goToBlogPage = function (blog) {
        this.contentfulService.cacheBlog(blog);
        this.router.navigate(['/blog', blog.sys.id]);
    };
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.css */ "./src/app/home/home.component.css")]
        }),
        __metadata("design:paramtypes", [_services_contentful_service__WEBPACK_IMPORTED_MODULE_2__["ContentfulService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/image-upload/image-upload.component.css":
/*!*********************************************************!*\
  !*** ./src/app/image-upload/image-upload.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/image-upload/image-upload.component.html":
/*!**********************************************************!*\
  !*** ./src/app/image-upload/image-upload.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col\">\n        Team Logo:\n    </div>\n</div>\n<div class=\"row\">\n    <div class=\"col\">\n        <div class=\"row\">\n            <div class=\"col\">\n                <img class=\"img-fluid\" [src]=\"imageToDisplay\" alt=\"\" />\n            </div>\n        </div>\n        <div class=\"row\" [hidden]=\"!_showEdit\">\n            <div class=\"col\">\n                <span class=\"finger\"><i (click)=\"editClicked=!editClicked\" class=\"material-icons\">launch</i></span>\n            </div>\n        </div>\n        <div class=\"row\" [hidden]=\"editClicked\">\n            <div class=\"col\">\n                <div class=\"row\">\n                    <div class=\"col\" [hidden]=\"!_showEdit\">\n                        Upload New Team Logo:\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col\" [hidden]=\"!_showEdit\">\n                        <div>\n                            <ngx-croppie *ngIf=\"croppieImage\" #ngxCroppie [croppieOptions]=\"croppieOptions\" [imageUrl]=\"croppieImageG\" (result)=\"newImageResultFromCroppie($event)\"></ngx-croppie>\n                        </div>\n                        <div>\n                            <input type=\"file\" id=\"fileupload\" #imageUpload (change)=\"imageUploadEvent($event)\" accept=\"image/gif, image/jpeg, image/png\" />\n                            <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" (click)=\"cancelCroppieEdit()\">Cancel</button>\n                            <button type=\"button\" class=\"btn btn-primary\" (click)=\"saveImageFromCroppie()\">Save</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/image-upload/image-upload.component.ts":
/*!********************************************************!*\
  !*** ./src/app/image-upload/image-upload.component.ts ***!
  \********************************************************/
/*! exports provided: ImageUploadComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageUploadComponent", function() { return ImageUploadComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_croppie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-croppie */ "./node_modules/ngx-croppie/fesm5/ngx-croppie.js");
/* harmony import */ var _services_team_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/team.service */ "./src/app/services/team.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ImageUploadComponent = /** @class */ (function () {
    function ImageUploadComponent(teamService) {
        this.teamService = teamService;
        this._showEdit = false;
        this.editClicked = true;
        this.widthPx = '350';
        this.heightPx = '230';
        this.imageUrl = '';
    }
    Object.defineProperty(ImageUploadComponent.prototype, "teamName", {
        set: function (name) {
            if (name != null && name != undefined && name.length) {
                this._teamName = name;
            }
            else {
                this._teamName = '';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageUploadComponent.prototype, "showEdit", {
        set: function (show) {
            if (show != null && show != undefined) {
                this._showEdit = show;
            }
            else {
                this._showEdit = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageUploadComponent.prototype, "teamLogo", {
        set: function (img) {
            if (img != null && img != undefined && img.length) {
                this.currentImage = this.teamService.imageFQDN(img);
            }
            else {
                this.currentImage = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageUploadComponent.prototype, "imageToDisplay", {
        get: function () {
            var imgRet;
            if (this.currentImage) {
                imgRet = this.currentImage;
            }
            else if (this.imageUrl) {
                imgRet = this.imageUrl;
            }
            else {
                imgRet = "https://placehold.it/" + this.widthPx + "x" + this.heightPx;
            }
            return imgRet;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageUploadComponent.prototype, "croppieOptions", {
        get: function () {
            var opts = {};
            opts.viewport = {
                width: parseInt(this.widthPx, 10),
                height: parseInt(this.heightPx, 10)
            };
            opts.boundary = {
                width: parseInt(this.widthPx, 10) * 1.1,
                height: parseInt(this.heightPx, 10) * 1.1
            };
            opts.enforceBoundary = false;
            return opts;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageUploadComponent.prototype, "croppieImageG", {
        get: function () {
            return this.croppieImage;
        },
        enumerable: true,
        configurable: true
    });
    ImageUploadComponent.prototype.ngOnInit = function () {
        this.currentImage = this.imageUrl;
        this.croppieImage = this.imageUrl;
    };
    ImageUploadComponent.prototype.ngOnChanges = function (changes) {
        if (this.croppieImage) {
            return;
        }
        if (!changes.imageUrl) {
            return;
        }
        if (!changes.imageUrl.previousValue && changes.imageUrl.currentValue) {
            this.croppieImage = changes.imageUrl.currentValue;
        }
    };
    ImageUploadComponent.prototype.newImageResultFromCroppie = function (img) {
        this.croppieImage = img;
    };
    ImageUploadComponent.prototype.saveImageFromCroppie = function () {
        var _this = this;
        var input = {
            logo: this.croppieImage,
            teamName: this._teamName
        };
        this.teamService.logoUpload(input).subscribe(function (res) {
            _this.currentImage = _this.croppieImage;
            _this.croppieImage = null;
            _this.editClicked = true;
        }, function (err) {
            console.log(err);
        });
    };
    ImageUploadComponent.prototype.cancelCroppieEdit = function () {
        this.croppieImage = null;
        this.editClicked = true;
    };
    ImageUploadComponent.prototype.imageUploadEvent = function (evt) {
        var _this = this;
        this.croppieImage = null;
        if (!evt.target) {
            return;
        }
        if (!evt.target.files) {
            return;
        }
        if (evt.target.files.length !== 1) {
            return;
        }
        var file = evt.target.files[0];
        if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif' && file.type !== 'image/jpg') {
            return;
        }
        var fr = new FileReader();
        fr.onloadend = function (loadEvent) {
            _this.croppieImage = '';
            _this.croppieImage = fr.result;
        };
        fr.readAsDataURL(file);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('ngxCroppie'),
        __metadata("design:type", ngx_croppie__WEBPACK_IMPORTED_MODULE_1__["NgxCroppieComponent"])
    ], ImageUploadComponent.prototype, "ngxCroppie", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ImageUploadComponent.prototype, "teamName", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ImageUploadComponent.prototype, "showEdit", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ImageUploadComponent.prototype, "teamLogo", null);
    ImageUploadComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-image-upload',
            template: __webpack_require__(/*! ./image-upload.component.html */ "./src/app/image-upload/image-upload.component.html"),
            styles: [__webpack_require__(/*! ./image-upload.component.css */ "./src/app/image-upload/image-upload.component.css")]
        }),
        __metadata("design:paramtypes", [_services_team_service__WEBPACK_IMPORTED_MODULE_2__["TeamService"]])
    ], ImageUploadComponent);
    return ImageUploadComponent;
}());



/***/ }),

/***/ "./src/app/login/login.component.css":
/*!*******************************************!*\
  !*** ./src/app/login/login.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".bNet {\n    background-color: #0e86ca;\n    border-color: #00aeff\n}\n\n.disclaimer {\n    color: #fb6969;\n    padding-right: 25px;\n    padding-left: 25px;\n    font-size: small;\n}"

/***/ }),

/***/ "./src/app/login/login.component.html":
/*!********************************************!*\
  !*** ./src/app/login/login.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container forceFull\">\n    <div class=\"row\" *ngIf=\"!Auth.isAuthenticated(); else loggedIn\">\n        <div class=\"col-3\"></div>\n        <div class=\"col\">\n            <div class=\"card mt-5\">\n                <div class=\"card-header\">\n                    NGS Login\n                </div>\n                <div class=\"card-body\">\n                    <h5 class=\"card-title\">We manage authentication and login via Battle.net</h5>\n                    <div class=\"text-center\"><a href=\"/auth/bnet\" class=\"btn btn-primary bNet\">Login with Battle.Net!</a></div>\n                    <div class=\"text-center mt-1\"><img class=\"text-center\" src=\"assets/Blizz_Corp_RGB_LightBkgd.png\" width=\"145\"></div>\n                </div>\n            </div>\n\n            <p class=\"disclaimer\">We do not capture any private data (ie: email); however we do create a profile including your battle.bet battle tag and collect information regarding your play schedule and MMR etc.</p>\n            <!-- <div class=\"mt-5\">\n                <div class=\"row\">\n                    <div class=\"col\">\n                        <h2>Login</h2>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col\">\n                        <p>We manage athentication an login via Battle.net:</p>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col\"><a type=\"button\" class=\"btn btn-success\" href=\"/auth/bnet\">Login with Battle.Net!</a></div>\n                </div>\n            </div> -->\n        </div>\n        <div class=\"col-3\"></div>\n    </div>\n    <ng-template #loggedIn>\n        <div class=\"row\">\n            <div class=\"col-sm\"></div>\n            <div class=\"col-sm\">\n                <h2>Welcome to the Nexus Gaming Series app!</h2>\n                <a type=\"button\" class=\"btn btn-success\" href=\"/profile/{{profile}}\">Check out your profile!</a>\n            </div>\n            <div class=\"col-sm\"></div>\n        </div>\n    </ng-template>\n</div>"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/user.service */ "./src/app/services/user.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginComponent = /** @class */ (function () {
    function LoginComponent(route, Auth, router, user) {
        this.route = route;
        this.Auth = Auth;
        this.router = router;
        this.user = user;
        if (route.snapshot.params['token']) {
            var URI = decodeURIComponent(route.snapshot.params['token']);
            var parsed = JSON.parse(URI);
            // console.log('parsed ',parsed );
            Auth.createAuth(parsed.token);
            // console.log('init in login ', Auth.getReferral());
            if (Auth.getReferral()) {
                this.user.outreachResponse(Auth.getReferral(), Auth.getUser()).subscribe(function (res) {
                    Auth.destroyReferral();
                }, function (err) { Auth.destroyReferral(); });
            }
            else if (Auth.isAuthenticated()) {
                this.profile = user.routeFriendlyUsername(Auth.getUser());
            }
            router.navigateByUrl('/profile/' + user.routeFriendlyUsername(Auth.getUser()));
        }
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.css */ "./src/app/login/login.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], _services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/logout/logout.component.css":
/*!*********************************************!*\
  !*** ./src/app/logout/logout.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/logout/logout.component.html":
/*!**********************************************!*\
  !*** ./src/app/logout/logout.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container forceFull\">\n    <div class=\"row\">\n        <div class=\"col-3\"></div>\n        <div class=\"col\">\n            <div class=\"card mt-5\">\n                <div class=\"card-header\">\n                    You have been logged out of Nexus Gaming Series!\n                </div>\n                <div class=\"card-body\">\n                    <p class=\"\">You have been logged out of Nexus Gaming Series, however battle.net does not provide a method for destroying your session with them, so please go to a battle.net webpage and action a logout.</p>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-3\"></div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/logout/logout.component.ts":
/*!********************************************!*\
  !*** ./src/app/logout/logout.component.ts ***!
  \********************************************/
/*! exports provided: LogoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogoutComponent", function() { return LogoutComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LogoutComponent = /** @class */ (function () {
    function LogoutComponent() {
    }
    LogoutComponent.prototype.ngOnInit = function () {
    };
    LogoutComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-logout',
            template: __webpack_require__(/*! ./logout.component.html */ "./src/app/logout/logout.component.html"),
            styles: [__webpack_require__(/*! ./logout.component.css */ "./src/app/logout/logout.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], LogoutComponent);
    return LogoutComponent;
}());



/***/ }),

/***/ "./src/app/members-display/members-display.component.css":
/*!***************************************************************!*\
  !*** ./src/app/members-display/members-display.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/members-display/members-display.component.html":
/*!****************************************************************!*\
  !*** ./src/app/members-display/members-display.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <div class=\"row\" *ngFor=\"let memberRow of memberRows\">\n    <div class=\"col\" *ngFor=\"let member of memberRow\">\n        <a [routerLink]=\"['/profile/', user.routeFriendlyUsername(member.displayName)]\">{{member.displayName}}</a>\n    </div>\n</div> -->\n<div class=\"row\" *ngFor=\"let member of members\">\n    <div class=\"col\">\n        <a [routerLink]=\"['/profile/', user.routeFriendlyUsername(member.displayName)]\">{{member.displayName}}</a>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/members-display/members-display.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/members-display/members-display.component.ts ***!
  \**************************************************************/
/*! exports provided: MembersDisplayComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MembersDisplayComponent", function() { return MembersDisplayComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/user.service */ "./src/app/services/user.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MembersDisplayComponent = /** @class */ (function () {
    function MembersDisplayComponent(user) {
        this.user = user;
        this._members = [];
        this.memberRows = [];
    }
    Object.defineProperty(MembersDisplayComponent.prototype, "members", {
        get: function () {
            return this._members;
        },
        set: function (members) {
            if (members != null && members != undefined && members.length) {
                this._members = members;
                // this.createMembersDisplay()
            }
            else {
                this._members = [];
            }
        },
        enumerable: true,
        configurable: true
    });
    MembersDisplayComponent.prototype.createMembersDisplay = function () {
        if (!this.perColumn) {
            this.perColumn = 2;
        }
        this.memberRows = [];
        if (this._members != undefined && this._members.length > 0) {
            if (this._members.length > this.perColumn) {
                for (var i = 0; i < this._members.length; i++) {
                    var temparr = [];
                    if (i % this.perColumn == 0) {
                        this.memberRows.push(temparr);
                        temparr = [];
                    }
                    temparr.push(this._members[i]);
                }
            }
            else {
                this.memberRows.push(this._members);
            }
        }
        else {
            this.memberRows = [];
        }
    };
    MembersDisplayComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], MembersDisplayComponent.prototype, "perColumn", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], MembersDisplayComponent.prototype, "members", null);
    MembersDisplayComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-members-display',
            template: __webpack_require__(/*! ./members-display.component.html */ "./src/app/members-display/members-display.component.html"),
            styles: [__webpack_require__(/*! ./members-display.component.css */ "./src/app/members-display/members-display.component.css")]
        }),
        __metadata("design:paramtypes", [_services_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"]])
    ], MembersDisplayComponent);
    return MembersDisplayComponent;
}());



/***/ }),

/***/ "./src/app/modal/change-captain-modal/change-captain-modal.component.css":
/*!*******************************************************************************!*\
  !*** ./src/app/modal/change-captain-modal/change-captain-modal.component.css ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/modal/change-captain-modal/change-captain-modal.component.html":
/*!********************************************************************************!*\
  !*** ./src/app/modal/change-captain-modal/change-captain-modal.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>Select New Captain</h1>\n<div mat-dialog-content>\n    <section class=\"example-section\">\n        <div *ngFor=\"let member of data.members; let i = index\">\n            <mat-checkbox class=\"example-margin\" [checked]=\"selected === member.displayName\" (change)=\"selected=member.displayName\" [disabled]=\"member.displayName==data.captain\">{{member.displayName}}</mat-checkbox>\n        </div>\n    </section>\n</div>\n<div mat-dialog-actions>\n    <button mat-button (click)=\"onNoClick()\">No Thanks</button>\n    <button mat-button [mat-dialog-close]=\"selected\" cdkFocusInitial>Ok</button>\n</div>"

/***/ }),

/***/ "./src/app/modal/change-captain-modal/change-captain-modal.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/modal/change-captain-modal/change-captain-modal.component.ts ***!
  \******************************************************************************/
/*! exports provided: ChangeCaptainModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChangeCaptainModalComponent", function() { return ChangeCaptainModalComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var ChangeCaptainModalComponent = /** @class */ (function () {
    function ChangeCaptainModalComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    ChangeCaptainModalComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    ChangeCaptainModalComponent.prototype.ngOnInit = function () {
    };
    ChangeCaptainModalComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-change-captain-modal',
            template: __webpack_require__(/*! ./change-captain-modal.component.html */ "./src/app/modal/change-captain-modal/change-captain-modal.component.html"),
            styles: [__webpack_require__(/*! ./change-captain-modal.component.css */ "./src/app/modal/change-captain-modal/change-captain-modal.component.css")]
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object])
    ], ChangeCaptainModalComponent);
    return ChangeCaptainModalComponent;
}());



/***/ }),

/***/ "./src/app/modal/delete-confrim-modal/delete-confrim-modal.component.css":
/*!*******************************************************************************!*\
  !*** ./src/app/modal/delete-confrim-modal/delete-confrim-modal.component.css ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/modal/delete-confrim-modal/delete-confrim-modal.component.html":
/*!********************************************************************************!*\
  !*** ./src/app/modal/delete-confrim-modal/delete-confrim-modal.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>Confirm Delete</h1>\n<div mat-dialog-content>\n    <p>Type delete to confirm delete:</p>\n    <mat-form-field class=\" mat-FullWidth\">\n        <input matInput [(ngModel)]=\"data.confirm\">\n    </mat-form-field>\n</div>\n<div mat-dialog-actions>\n    <button mat-button (click)=\"onNoClick()\">No Thanks</button>\n    <button mat-button [mat-dialog-close]=\"data.confirm\" cdkFocusInitial>Ok</button>\n</div>"

/***/ }),

/***/ "./src/app/modal/delete-confrim-modal/delete-confrim-modal.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/modal/delete-confrim-modal/delete-confrim-modal.component.ts ***!
  \******************************************************************************/
/*! exports provided: DeleteConfrimModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeleteConfrimModalComponent", function() { return DeleteConfrimModalComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var DeleteConfrimModalComponent = /** @class */ (function () {
    function DeleteConfrimModalComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    DeleteConfrimModalComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    DeleteConfrimModalComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-delete-confrim-modal',
            template: __webpack_require__(/*! ./delete-confrim-modal.component.html */ "./src/app/modal/delete-confrim-modal/delete-confrim-modal.component.html"),
            styles: [__webpack_require__(/*! ./delete-confrim-modal.component.css */ "./src/app/modal/delete-confrim-modal/delete-confrim-modal.component.css")]
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object])
    ], DeleteConfrimModalComponent);
    return DeleteConfrimModalComponent;
}());



/***/ }),

/***/ "./src/app/nav/nav.component.css":
/*!***************************************!*\
  !*** ./src/app/nav/nav.component.css ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container {\n    background-color: #F26A2F;\n}\n\n.navbar {\n    background-color: #F26A2F;\n    color: white;\n}"

/***/ }),

/***/ "./src/app/nav/nav.component.html":
/*!****************************************!*\
  !*** ./src/app/nav/nav.component.html ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar fixed-top navbar-expand-lg navbar-dark fixed-top\">\n    <div class=\"container\">\n        <a class=\"navbar-brand\" [routerLink]=\"['/']\">Home</a>\n        <button class=\"navbar-toggler navbar-toggler-right\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarResponsive\" aria-controls=\"navbarResponsive\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n      <span class=\"navbar-toggler-icon\"></span>\n    </button>\n        <div class=\"collapse navbar-collapse\" id=\"navbarResponsive\">\n            <ul class=\"navbar-nav ml-auto\">\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" [routerLink]=\"['/blog','3BLsIya6ZiWQWka4IeUw2']\">Rules</a>\n                </li>\n                <li class=\"nav-item dropdown\">\n                    <a class=\"nav-link dropdown-toggle finger\" id=\"divisionDropdown\" role=\"button\" data-toggle=\"dropdown\" aria-expanded=\"false\">Divisions</a>\n                    <div class=\"dropdown-menu\">\n                        <a class=\"dropdown-item\" *ngFor=\"let division of divisions\" [routerLink]=\"['/division/',division.divisionConcat]\">{{division.displayName}}</a>\n                    </div>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" [routerLink]=\"['/calendar']\">Calendar</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" [routerLink]=\"['/blog']\">Blog</a>\n                </li>\n                <ul class=\"navbar-nav mr-auto\">\n                    <li class=\"nav-item\" *ngIf=\"!Auth.isAuthenticated() else loggedIn\">\n                        <a class=\"nav-link\" [routerLink]=\"['/login']\">Login</a>\n                    </li>\n                    <ng-template #loggedIn>\n                        <li class=\"nav-item dropdown\">\n                            <a class=\"nav-link dropdown-toggle finger\" id=\"navbarDropdown\" role=\"button\" data-toggle=\"dropdown\" aria-expanded=\"false\">{{Auth.getUser()}} </a>\n                            <div class=\"dropdown-menu\">\n                                <a class=\"dropdown-item finger\" (click)=\"navGo('/profile/',user.routeFriendlyUsername(Auth.getUser()))\">Profile</a>\n                                <div *ngIf=\"Auth.getTeam(); else noTeam\">\n                                    <a class=\"dropdown-item finger\" (click)=\"navGo('/teamProfile/',team.routeFriendlyTeamName( Auth.getTeam() ) )\">Team</a>\n                                    <a class=\"dropdown-item finger\" [routerLink]=\"['/schedule/teamSchedule']\">Schedule</a>\n                                    <div *ngIf=\"Auth.getCaptain()\">\n                                        <!--TODO: implement Find players <a class=\"dropdown-item\" (click)=\"navGo('/teamProfile/',team.routeFriendlyTeamName( Auth.getTeam() ) )\">Find Players</a> -->\n                                        <a class=\"dropdown-item finger\" (click)=\"navGo('/reporting/',team.routeFriendlyTeamName( Auth.getTeam() ) )\">Reporting</a>\n                                    </div>\n\n                                </div>\n                                <ng-template #noTeam>\n                                    <a class=\"dropdown-item finger\" [routerLink]=\"['/teamCreate']\">Create Team</a>\n                                    <!-- TODO: implement a find team <a class=\"dropdown-item finger\" (click)=\"navGo('/teamProfile/',team.routeFriendlyTeamName( teamName ) )\">Find Team</a> -->\n                                </ng-template>\n                                <a *ngIf=\"Auth.getAdmin() && Auth.getAdmin().length>0\" class=\"dropdown-item finger\" (click)=\"navGo('/_admin/dashboard')\">Admin Dashboard</a>\n                                <a *ngIf=\"Auth.getCaster()\" class=\"dropdown-item finger\" (click)=\"navGo('/_casterDashboard')\">Caster Dashboard</a>\n                                <div class=\"dropdown-divider\"></div>\n                                <a class=\"dropdown-item finger\" (click)=\"Auth.destroyAuth('/logout')\">Logout</a>\n                            </div>\n                        </li>\n                    </ng-template>\n\n                </ul>\n            </ul>\n        </div>\n    </div>\n</nav>"

/***/ }),

/***/ "./src/app/nav/nav.component.ts":
/*!**************************************!*\
  !*** ./src/app/nav/nav.component.ts ***!
  \**************************************/
/*! exports provided: NavComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavComponent", function() { return NavComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_team_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/team.service */ "./src/app/services/team.service.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_division_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/division.service */ "./src/app/services/division.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var NavComponent = /** @class */ (function () {
    function NavComponent(Auth, router, team, user, divisionService) {
        this.Auth = Auth;
        this.router = router;
        this.team = team;
        this.user = user;
        this.divisionService = divisionService;
    }
    NavComponent.prototype.navGo = function (appRoute, path) {
        if (path != null && path != undefined && path.length > 0) {
            this.router.navigateByUrl(appRoute + path);
        }
        else {
            this.router.navigateByUrl(appRoute);
            //nah
        }
    };
    NavComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.divisionService.getDivisionInfo().subscribe(function (res) {
            _this.divisions = res;
        }, function (err) {
            console.log(err);
        });
        if (this.Auth.getTeam()) {
            this.teamName = this.Auth.getTeam();
        }
        if (this.Auth.isAuthenticated()) {
            this.userName = this.Auth.getUser();
        }
    };
    NavComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-nav',
            template: __webpack_require__(/*! ./nav.component.html */ "./src/app/nav/nav.component.html"),
            styles: [__webpack_require__(/*! ./nav.component.css */ "./src/app/nav/nav.component.css")]
        }),
        __metadata("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _services_team_service__WEBPACK_IMPORTED_MODULE_3__["TeamService"], _services_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"], _services_division_service__WEBPACK_IMPORTED_MODULE_5__["DivisionService"]])
    ], NavComponent);
    return NavComponent;
}());



/***/ }),

/***/ "./src/app/no-access/no-access.component.css":
/*!***************************************************!*\
  !*** ./src/app/no-access/no-access.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/no-access/no-access.component.html":
/*!****************************************************!*\
  !*** ./src/app/no-access/no-access.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container forceFull\">\n    <div class=\"row\">\n        <div class=\"col text-center\">\n            <h3>!UNAUTHORIZED!</h3>\n            <h4>Sorry you do not have access to that!</h4>\n            <h5>If you feel that you should please contact an admin and request \" {{role}} \" access!</h5>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/no-access/no-access.component.ts":
/*!**************************************************!*\
  !*** ./src/app/no-access/no-access.component.ts ***!
  \**************************************************/
/*! exports provided: NoAccessComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoAccessComponent", function() { return NoAccessComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NoAccessComponent = /** @class */ (function () {
    function NoAccessComponent(router) {
        this.router = router;
        this.role = '';
        this.role = this.router.snapshot.params['id'];
        this.role = this.role.toUpperCase();
    }
    NoAccessComponent.prototype.ngOnInit = function () {
    };
    NoAccessComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-no-access',
            template: __webpack_require__(/*! ./no-access.component.html */ "./src/app/no-access/no-access.component.html"),
            styles: [__webpack_require__(/*! ./no-access.component.css */ "./src/app/no-access/no-access.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]])
    ], NoAccessComponent);
    return NoAccessComponent;
}());



/***/ }),

/***/ "./src/app/outreach-email-response/outreach-email-response.component.css":
/*!*******************************************************************************!*\
  !*** ./src/app/outreach-email-response/outreach-email-response.component.css ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".disclaimer {\n    color: #fb6969;\n    padding-right: 25px;\n    padding-left: 25px;\n    font-size: small;\n}"

/***/ }),

/***/ "./src/app/outreach-email-response/outreach-email-response.component.html":
/*!********************************************************************************!*\
  !*** ./src/app/outreach-email-response/outreach-email-response.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container forceFull\">\n    <div class=\"row\">\n        <div class=\"col-3\"></div>\n        <div class=\"col\">\n            <div class=\"card mt-5\">\n                <div class=\"card-header\">\n                    Welcome to the Nexus Gaming Series!\n                    <!--NGS!-->\n                </div>\n                <div class=\"card-body\">\n                    <h5 class=\"card-title\">You've been invited to join an elite group of players to test your mettle in the Nexus!</h5>\n                    <div class=\"text-center\"><a href=\"/auth/bnet\" class=\"btn btn-primary bNet\">Login with Battle.Net!</a></div>\n                    <div class=\"text-center mt-1\"><img class=\"text-center\" src=\"assets/Blizz_Corp_RGB_LightBkgd.png\" width=\"145\"></div>\n                </div>\n            </div>\n\n            <p class=\"disclaimer\">\n                We do not capture any private data (ie: email); however we do create a profile including your battle.bet account and collect information regarding your play schedule and MMR etc.\n            </p>\n        </div>\n        <div class=\"col-3\"></div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/outreach-email-response/outreach-email-response.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/outreach-email-response/outreach-email-response.component.ts ***!
  \******************************************************************************/
/*! exports provided: OutreachEmailResponseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OutreachEmailResponseComponent", function() { return OutreachEmailResponseComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/auth.service */ "./src/app/services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var OutreachEmailResponseComponent = /** @class */ (function () {
    function OutreachEmailResponseComponent(route, auth) {
        this.route = route;
        this.auth = auth;
        if (route.snapshot.params['id']) {
            console.log('setting referral code');
            auth.setReferral(route.snapshot.params['id']);
            console.log(auth.getReferral());
        }
    }
    OutreachEmailResponseComponent.prototype.ngOnInit = function () {
    };
    OutreachEmailResponseComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-outreach-email-response',
            template: __webpack_require__(/*! ./outreach-email-response.component.html */ "./src/app/outreach-email-response/outreach-email-response.component.html"),
            styles: [__webpack_require__(/*! ./outreach-email-response.component.css */ "./src/app/outreach-email-response/outreach-email-response.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], _services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]])
    ], OutreachEmailResponseComponent);
    return OutreachEmailResponseComponent;
}());



/***/ }),

/***/ "./src/app/profile-edit/profile-edit.component.css":
/*!*********************************************************!*\
  !*** ./src/app/profile-edit/profile-edit.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".example-container {\n    display: flex;\n    flex-direction: column;\n}\n\n.example-container>* {\n    width: 100%;\n}\n\n.cb-vertival {\n    flex-flow: column;\n}\n\n.cb-wrapper {\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: left;\n    flex-flow: row;\n}\n\n.pe-full-width {\n    width: 100%;\n}\n\n.role-margin {\n    margin: 0 10px;\n}\n\n.icon-align {\n    display: inline-flex;\n    vertical-align: middle;\n}"

/***/ }),

/***/ "./src/app/profile-edit/profile-edit.component.html":
/*!**********************************************************!*\
  !*** ./src/app/profile-edit/profile-edit.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- *ngIf=\"userProfile|async as resolvedUser; else loading\" -->\n<div class=\"container\">\n    <div class=\"bg-white\">\n        <div class=\"row\">\n            <div class=\"col\">\n                <div class=\"row\" *ngIf=\"auth.getUser() === returnedProfile.displayName\">\n                    <div class=\"col-8 offset-2\">\n                        <div class=\"row mt-3\">\n                            <div class=\"col-6\">\n                                Welcome to your player profile!\n                            </div>\n                            <div class=\"col-6\">\n                                <div *ngIf=\"editOn == true\">\n                                    <button type=\"button\" (click)=\"openEdit()\" class=\"btn btn-primary float-right\">Edit</button>\n                                </div>\n                                <div class=\"row\" *ngIf=\"!editOn\">\n                                    <div class=\"col\">\n                                        <button type=\"button\" (click)=\"openDialog()\" class=\"btn btn-danger \"><span class=\"icon-align\"><i class=\"material-icons\">delete_forever</i>Delete</span></button>\n                                    </div>\n                                    <div class=\"col\">\n                                        <button type=\"button\" [disabled]=\"!profileForm.valid\" (click)=\"save()\" class=\"btn btn-success \"><span class=\"icon-align\"><i class=\"material-icons\">check</i>Save</span></button>\n                                    </div>\n                                    <div class=\"col\">\n                                        <button type=\"button\" (click)=\"cancel()\" class=\"btn btn-danger\"><span class=\"icon-align\"><i class=\"material-icons\">close</i>Cancel</span></button>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"row mt-2\">\n                    <div class=\"col-md-12\">\n                        <div class=\"example-container\">\n                            <mat-form-field>\n                                <input matInput placeholder=\"Display Name\" [(ngModel)]=\"returnedProfile.displayName\" disabled=\"true\">\n                            </mat-form-field>\n                            <mat-form-field>\n                                <input matInput placeholder=\"HOTS LOGS URL\" [formControl]=\"hotsLogsFormControl\" [(ngModel)]=\"returnedProfile.hotsLogsURL\">\n                                <mat-error *ngIf=\"hotsLogsFormControl.hasError('required')\">\n                                    HOTS Logs URL is required\n                                </mat-error>\n                                <mat-error *ngIf=\"hotsLogsFormControl.hasError('invalidurl')\">\n                                    This doesn't match the pattern we're looking for: https://www.hotslogs.com/Player/Profile?PlayerID=######\n                                </mat-error>\n\n                            </mat-form-field>\n                            <mat-form-field>\n                                <input matInput placeholder=\"Discord Tag\" [formControl]=\"discordTagFormControl\" [(ngModel)]=\"returnedProfile.discordTag\">\n                                <mat-error *ngIf=\"discordTagFormControl.hasError('required')\">\n                                    Discord Tag is required.\n                                </mat-error>\n                            </mat-form-field>\n                            <mat-form-field>\n                                <mat-select placeholder=\"Hero League Division\" [formControl]=\"heroeLeagueDivisionControl\" [(ngModel)]=\"returnedProfile.hlRankMetal\" disableOptionCentering>\n                                    <mat-option *ngFor=\"let medal of hlMedals\" [value]=\"medal\">\n                                        {{medal}}\n                                    </mat-option>\n                                    <mat-error *ngIf=\"heroeLeagueDivisionControl.hasError('required')\">\n                                        Hero League Division is required\n                                    </mat-error>\n                                </mat-select>\n                            </mat-form-field>\n                            <div class=\"pe-full-width\" *ngIf=\"returnedProfile.hlRankMetal != 'Master' && returnedProfile.hlRankMetal != 'Grand Master'\">\n                                <mat-form-field class=\"pe-full-width\">\n                                    <mat-select placeholder=\"Hero League Rank\" [formControl]=\"heroeLeagueRankControl\" [(ngModel)]=\"returnedProfile.hlRankDivision\" disableOptionCentering>\n                                        <mat-option *ngFor=\"let rank of hlDivision\" [value]=\"rank\">\n                                            {{rank}}\n                                        </mat-option>\n                                        <mat-error *ngIf=\"heroeLeagueRankControl.hasError('required')\">\n                                            Hero League Rank is required\n                                        </mat-error>\n                                    </mat-select>\n                                </mat-form-field>\n                            </div>\n\n                            <div class=\"pe-full-width\" *ngIf=\"returnedProfile.hlRankMetal == 'Master' || returnedProfile.hlRankMetal == 'Grand Master'\">\n                                <mat-form-field class=\"pe-full-width\">\n                                    <input matInput placeholder=\"Rank Number\" [formControl]=\"heroeLeagueRankControl\" [(ngModel)]=\"returnedProfile.hlRankDivision\">\n                                </mat-form-field>\n                                <mat-error *ngIf=\"heroeLeagueRankControl.hasError('required')\">\n                                    Hero League Rank is required\n                                </mat-error>\n                            </div>\n\n                            <div class=\"row\">\n                                <div class=\"col\">\n                                    <mat-slide-toggle disabled=\"{{editOn}}\" [(ngModel)]=\"returnedProfile.lookingForGroup\">\n                                        Looking for team.\n                                    </mat-slide-toggle>\n                                </div>\n                            </div>\n\n                            <mat-form-field class=\"mt-3\">\n                                <mat-select placeholder=\"Competitive Level\" disabled=\"{{editOn}}\" [(ngModel)]=\"returnedProfile.competitiveLevel\" disableOptionCentering>\n                                    <mat-option *ngFor=\"let level of competitonLevel\" [value]=\"level\">\n                                        {{level}}\n                                    </mat-option>\n                                </mat-select>\n                                <mat-hint align=\"start\"><strong>Generally how serious / competitively you're looking to play</strong>\n                                </mat-hint>\n                            </mat-form-field>\n\n                            <div class=\"row mt-3\">\n                                <div class=\"col\">\n                                    <mat-form-field class=\"pe-full-width\">\n                                        <mat-label>Describe your play history / style</mat-label>\n                                        <textarea matInput cdkTextareaAutosize disabled=\"{{editOn}}\" [(ngModel)]=\"returnedProfile.descriptionOfPlay\"></textarea>\n                                    </mat-form-field>\n                                </div>\n                            </div>\n                            <!-- <div class=\"row mt-3\">\n                            <div class=\"col\">\n                                <mat-form-field class=\"pe-full-width\">\n                                    <input matInput placeholder=\"Enter your toon ID, we will use this tie your profile to submitted replays\" [(ngModel)]=\"returnedProfile.toonId\" disabled=\"{{editOn}}\">\n                                </mat-form-field>\n                            </div>\n                        </div> -->\n                            <div class=\"row mt-1\">\n                                <div class=\"col\">\n                                    Roles:\n                                    <section>\n                                        <mat-checkbox class=\"role-margin\" disabled=\"{{editOn}}\" [(ngModel)]=\"returnedProfile.role.tank\">Tank</mat-checkbox>\n                                        <mat-checkbox class=\"role-margin\" disabled=\"{{editOn}}\" [(ngModel)]=\"returnedProfile.role.offlane\">Offlane</mat-checkbox>\n                                        <mat-checkbox class=\"role-margin\" disabled=\"{{editOn}}\" [(ngModel)]=\"returnedProfile.role.meleeassassin\">Melee Assassin</mat-checkbox>\n                                        <mat-checkbox class=\"role-margin\" disabled=\"{{editOn}}\" [(ngModel)]=\"returnedProfile.role.rangedassassin\">Ranged Assassin</mat-checkbox>\n                                        <mat-checkbox class=\"role-margin\" disabled=\"{{editOn}}\" [(ngModel)]=\"returnedProfile.role.support\">Support</mat-checkbox>\n                                        <mat-checkbox class=\"role-margin\" disabled=\"{{editOn}}\" [(ngModel)]=\"returnedProfile.role.flex\">Flex</mat-checkbox>\n                                    </section>\n                                </div>\n                            </div>\n                            <!-- Availability Schedule -->\n\n                            <!-- !editOn && !returnedProfile.availability.monday.available || editOn &&  -->\n                            <app-times-available [customText]=\"'Availability'\" [availObj]=\"returnedProfile.availability\" (availValid)=\"recieveAvailTimeValidity($event)\" [disabled]=\"editOn\"></app-times-available>\n\n                            <div class=\"row mt-3\">\n                                <div class=\"col\">\n                                    <mat-form-field class=\"pe-full-width\">\n                                        <mat-select placeholder=\"Timezone:\" [formControl]=\"timezoneControl\" [(ngModel)]=\"returnedProfile.timeZone\">\n                                            <mat-option *ngFor=\"let zone of timezone.timezones\" [value]=\"zone.value\">\n                                                {{zone.text}}\n                                            </mat-option>\n                                        </mat-select>\n                                        <mat-error *ngIf=\"timezoneControl.hasError('required')\">\n                                            Timezone is required\n                                        </mat-error>\n                                    </mat-form-field>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n\n\n            <ng-template #loading>\n                <div class=\"row\">\n                    <div class=\"col\">\n                        <h3>Loading profile..</h3>\n                    </div>\n                </div>\n            </ng-template>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/profile-edit/profile-edit.component.ts":
/*!********************************************************!*\
  !*** ./src/app/profile-edit/profile-edit.component.ts ***!
  \********************************************************/
/*! exports provided: ProfileEditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileEditComponent", function() { return ProfileEditComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_timezone_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/timezone.service */ "./src/app/services/timezone.service.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _classes_profile_class__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../classes/profile.class */ "./src/app/classes/profile.class.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _services_hots_logs_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../services/hots-logs.service */ "./src/app/services/hots-logs.service.ts");
/* harmony import */ var _services_notification_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../services/notification.service */ "./src/app/services/notification.service.ts");
/* harmony import */ var _modal_delete_confrim_modal_delete_confrim_modal_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../modal/delete-confrim-modal/delete-confrim-modal.component */ "./src/app/modal/delete-confrim-modal/delete-confrim-modal.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var ProfileEditComponent = /** @class */ (function () {
    function ProfileEditComponent(notificationService, timezone, user, auth, router, route, hotsLogsService, dialog) {
        this.notificationService = notificationService;
        this.timezone = timezone;
        this.user = user;
        this.auth = auth;
        this.router = router;
        this.route = route;
        this.hotsLogsService = hotsLogsService;
        this.dialog = dialog;
        this.editOn = true;
        this.hotsLogsFormControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"]({ value: '', disabled: true }, [
            _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required,
            this.hotslogsUrlPatternValidator
        ]);
        this.discordTagFormControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"]({ value: '', disabled: true }, [
            _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required
        ]);
        this.heroeLeagueDivisionControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"]({ value: '', disabled: true }, [
            _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required
        ]);
        this.heroeLeagueRankControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"]({ value: '', disabled: true }, [
            _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required
        ]);
        this.timezoneControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"]({ value: '', disabled: true }, [
            _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required
        ]);
        this.timesAvailControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"]();
        this.profileForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormGroup"]({
            hotslogurl: this.hotsLogsFormControl,
            discordTag: this.discordTagFormControl,
            hlDivision: this.heroeLeagueDivisionControl,
            hlRank: this.heroeLeagueRankControl,
            timezone: this.timezoneControl,
            timeAvail: this.timesAvailControl
        });
        this.returnedProfile = new _classes_profile_class__WEBPACK_IMPORTED_MODULE_6__["Profile"](null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
        this.dataRet = false;
        this.hlMedals = ['Grand Master', 'Master', 'Diamond', 'Platinum', 'Gold', 'Silver', 'Bronze'];
        this.hlDivision = [1, 2, 3, 4, 5];
        this.competitonLevel = [
            'Low', 'Medium', 'High'
        ];
        this.validAvailTimes = false;
        this.displayName = user.realUserName(this.route.snapshot.params['id']);
    }
    ProfileEditComponent.prototype.hotslogsUrlPatternValidator = function (control) {
        var hotslogsURL = control.value;
        var regex = new RegExp(/^((https):\/)\/www\.hotslogs\.com\/player\/profile\?playerid\=[0-9]+/, 'i');
        if (regex.test(hotslogsURL)) {
            return null;
        }
        else {
            return {
                invalidurl: true
            };
        }
        ;
    };
    ProfileEditComponent.prototype.formControlledEnable = function () {
        this.hotsLogsFormControl.enable();
        this.discordTagFormControl.enable();
        this.heroeLeagueDivisionControl.enable();
        this.heroeLeagueRankControl.enable();
        this.timezoneControl.enable();
    };
    ProfileEditComponent.prototype.formControlledDisable = function () {
        this.hotsLogsFormControl.disable();
        this.discordTagFormControl.disable();
        this.heroeLeagueDivisionControl.disable();
        this.heroeLeagueRankControl.disable();
        this.timezoneControl.disable();
    };
    Object.defineProperty(ProfileEditComponent.prototype, "passedProfile", {
        set: function (profile) {
            if (profile != null && profile != undefined) {
                this.providedProfile = profile;
                this.ngOnInit();
            }
        },
        enumerable: true,
        configurable: true
    });
    ProfileEditComponent.prototype.openDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(_modal_delete_confrim_modal_delete_confrim_modal_component__WEBPACK_IMPORTED_MODULE_11__["DeleteConfrimModalComponent"], {
            width: '300px',
            data: { confirm: this.confirm }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result.toLowerCase() == 'delete') {
                _this.user.deleteUser().subscribe(function (res) {
                    _this.auth.destroyAuth('/logout');
                }, function (err) {
                    console.log(err);
                });
            }
        });
    };
    ProfileEditComponent.prototype.hideDay = function (editSwitch, dayAvailabilty) {
        if (!editSwitch) {
            return false;
        }
        else {
            if (dayAvailabilty) {
                return false;
            }
            else {
                return true;
            }
        }
    };
    ProfileEditComponent.prototype.markFormGroupTouched = function (formGroup) {
        if (formGroup.controls) {
            var keys = Object.keys(formGroup.controls);
            for (var i = 0; i < keys.length; i++) {
                var control = formGroup.controls[keys[i]];
                if (control instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"]) {
                    control.markAsTouched();
                }
                else if (control instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormGroup"]) {
                    this.markFormGroupTouched(control);
                }
            }
        }
    };
    ProfileEditComponent.prototype.openEdit = function () {
        this.editOn = false;
        this.formControlledEnable();
        this.markFormGroupTouched(this.profileForm);
        this.tempProfile = new _classes_profile_class__WEBPACK_IMPORTED_MODULE_6__["Profile"](null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
        Object(lodash__WEBPACK_IMPORTED_MODULE_8__["merge"])(this.tempProfile, this.returnedProfile);
    };
    ProfileEditComponent.prototype.cancel = function () {
        this.returnedProfile = Object.assign({}, this.tempProfile);
        this.editOn = true;
        this.formControlledDisable();
    };
    ProfileEditComponent.prototype.save = function () {
        var _this = this;
        if (this.validate()) {
            if (!this.isNullOrEmpty(this.returnedProfile.hotsLogsURL)) {
                this.hotsLogsService.getMMR(this.returnedProfile.hotsLogsURL).subscribe(function (res) {
                    if (res != 'error') {
                        _this.returnedProfile.averageMmr = res;
                        _this.user.saveUser(_this.returnedProfile).subscribe(function (res) {
                            if (res) {
                                _this.editOn = true;
                                _this.formControlledDisable();
                            }
                            else {
                                alert("error");
                            }
                        });
                    }
                    else {
                        alert('We could not validate your hots logs, please recheck the URL!');
                        _this.cancel();
                    }
                });
            }
            else {
                this.user.saveUser(this.returnedProfile).subscribe(function (res) {
                    if (res) {
                        _this.editOn = true;
                        _this.formControlledDisable();
                    }
                    else {
                        alert("error");
                    }
                });
            }
        }
        else {
            console.log('the data was invalid we cant save');
        }
    };
    ProfileEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        var getProfile;
        if (this.providedProfile) {
            getProfile = this.providedProfile;
        }
        else if (this.displayName) {
            getProfile = this.displayName;
        }
        this.profSub = this.user.getUser(getProfile).subscribe(function (res) {
            Object(lodash__WEBPACK_IMPORTED_MODULE_8__["merge"])(_this.returnedProfile, res);
        });
    };
    ProfileEditComponent.prototype.recieveAvailTimeValidity = function (event) {
        this.validAvailTimes = event;
        if (event) {
            this.timesAvailControl.setErrors(null);
        }
        else {
            this.timesAvailControl.setErrors({ invalid: true });
        }
    };
    ProfileEditComponent.prototype.validate = function () {
        var valid = true;
        //validate the hotslogs URL
        if (this.isNullOrEmpty(this.returnedProfile.hotsLogsURL) ||
            this.returnedProfile.hotsLogsURL.indexOf('https://www.hotslogs.com/Player/Profile?PlayerID=') == -1) {
            valid = false;
        }
        //validate the hero leauge information
        if (this.isNullOrEmpty(this.returnedProfile.hlRankMetal) && this.isNullOrEmpty(this.returnedProfile.hlRankDivision)) {
            valid = false;
        }
        //validate looking for team:
        if (this.isNullOrEmpty(this.returnedProfile.lookingForGroup)) {
            valid = false;
        }
        //will we require the comp level, play history, roles?
        //validate that we have start and end times for available days
        if (!this.validAvailTimes) {
            valid = false;
            this.timesAvailControl.setErrors({ invalid: true });
        }
        else {
            this.timesAvailControl.setErrors(null);
        }
        //ensure time zone
        if (this.isNullOrEmpty(this.returnedProfile.timeZone)) {
            valid = false;
        }
        return valid;
    };
    ProfileEditComponent.prototype.isNullOrEmpty = function (dat) {
        if (dat == null || dat == undefined) {
            return true;
        }
        if (Array.isArray(dat)) {
            if (dat.length == 0) {
                return true;
            }
        }
        else if (typeof dat == 'object') {
            var noe = false;
            for (var key in dat) {
                if (this.isNullOrEmpty(dat[key])) {
                    noe = true;
                }
            }
            return noe;
        }
        else if (typeof dat == "string") {
            return dat.length == 0;
        }
        else {
            return false;
        }
    };
    ProfileEditComponent.prototype.ngOnDestroy = function () {
        this.profSub.unsubscribe();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ProfileEditComponent.prototype, "passedProfile", null);
    ProfileEditComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ReactiveFormsModule"]
            ]
        }),
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-profile-edit',
            template: __webpack_require__(/*! ./profile-edit.component.html */ "./src/app/profile-edit/profile-edit.component.html"),
            styles: [__webpack_require__(/*! ./profile-edit.component.css */ "./src/app/profile-edit/profile-edit.component.css")]
        }),
        __metadata("design:paramtypes", [_services_notification_service__WEBPACK_IMPORTED_MODULE_10__["NotificationService"], _services_timezone_service__WEBPACK_IMPORTED_MODULE_3__["TimezoneService"], _services_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"], _services_auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _services_hots_logs_service__WEBPACK_IMPORTED_MODULE_9__["HotsLogsService"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"]])
    ], ProfileEditComponent);
    return ProfileEditComponent;
}());



/***/ }),

/***/ "./src/app/questionnaire/questionnaire.component.css":
/*!***********************************************************!*\
  !*** ./src/app/questionnaire/questionnaire.component.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".checkboxMargin {\n    margin-right: 20px;\n}\n\n.removeClass {\n    border-style: solid;\n    padding: 3px;\n    border-width: 2px;\n}\n\n.tdClass {\n    padding: 5px;\n}\n\n.vertCentButton {\n    margin-top: auto;\n    margin-bottom: auto;\n}\n\n.questionnaireWrapper {\n    border-style: solid;\n    padding: 25px;\n}"

/***/ }),

/***/ "./src/app/questionnaire/questionnaire.component.html":
/*!************************************************************!*\
  !*** ./src/app/questionnaire/questionnaire.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <div class=\"questionnaireWrapper\">\n        <div class=\"row\">\n            <div class=\"col\">\n                <h3>Season 6 Registration / Questionnaire</h3>\n            </div>\n            <div class=\"col\">\n                <button [disabled]=\"responses.registered\" (click)=\"save()\" class=\"btn btn-success\">Save Questionnaire</button>\n            </div>\n        </div>\n        <div class=\"row mt-3\">\n            <div class=\"col\">\n                <h5>Team Name</h5>\n            </div>\n        </div>\n        <div class=\"row\" *ngIf=\"passedTeam.teamName\">\n            <div class=\"col\">\n                <mat-form-field class=\"mat-FullWidth\">\n                    <input matInput placeholder=\"Team Name\" disabled=\"true\" value={{passedTeam.teamName}}>\n                </mat-form-field>\n            </div>\n        </div>\n        <div class=\"row mt-3\">\n            <div class=\"col\">\n                <h5>Did you or anyone on your team play in NGS last season?</h5>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col\">\n                <mat-radio-group [(ngModel)]='responses.lastSeason'>\n                    <mat-radio-button class=\"checkboxMargin\" value=\"yes\">Yes</mat-radio-button>\n                </mat-radio-group>\n                <mat-radio-group [(ngModel)]='responses.lastSeason'>\n                    <mat-radio-button class=\"checkboxMargin\" value=\"no\">No</mat-radio-button>\n                </mat-radio-group>\n            </div>\n        </div>\n        <!-- if the team did not play last season don't show these -->\n        <div *ngIf=\"responses.lastSeason == 'yes'\">\n            <div class=\"row mt-3\">\n                <div class=\"col\">\n                    <h5>If so, what team name did you play under?</h5>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col\">\n                    <mat-form-field class=\"mat-FullWidth\">\n                        <input matInput placeholder=\"Old team name\" [(ngModel)]=\"responses.oldTeam\">\n                    </mat-form-field>\n                </div>\n            </div>\n            <div class=\"row mt-3\">\n                <div class=\"col\">\n                    <h5>What Div did you play in?</h5>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col\">\n                    <mat-form-field class=\"mat-FullWidth\">\n                        <input matInput placeholder=\"Old Division\" [(ngModel)]=\"responses.oldDivision\">\n                    </mat-form-field>\n                </div>\n            </div>\n            <div class=\"row mt-3\">\n                <div class=\"col\">\n                    <h5>How many returning players do you have? Based on Season 5 NGS divisions, what level were they?</h5>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col\">\n                    <mat-form-field class=\"mat-FullWidth\">\n                        <input matInput placeholder=\"Returning players\" [(ngModel)]=\"responses.returningPlayers\">\n                    </mat-form-field>\n                </div>\n                <div class=\"col\">\n                    <mat-form-field class=\"mat-FullWidth\">\n                        <input matInput placeholder=\"Returning players Div\" [(ngModel)]=\"responses.returningPlayersDiv\">\n                    </mat-form-field>\n                </div>\n            </div>\n            <!-- div branch end -->\n        </div>\n\n        <div class=\"row mt-3\">\n            <div class=\"col\">\n                <h5>Has your team played in any other competitions? At what level?</h5>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col\">\n                <mat-form-field class=\"mat-FullWidth\">\n                    <input matInput placeholder=\"Other competitions\" [(ngModel)]=\"responses.otherLeagues\">\n                </mat-form-field>\n            </div>\n        </div>\n        <!-- didn't play ngs -->\n        <div *ngIf=\"responses.lastSeason == 'no'\">\n            <div class=\"row mt-3\">\n                <div class=\"col\">\n                    <h5>If you didn’t play in NGS last season, what do you feel the overall playing skill of your team is? (Bronze, Silver, Gold, Plat…...) </h5>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col\">\n                    <mat-form-field class=\"mat-FullWidth\">\n                        <input matInput placeholder=\"Skill level\" [(ngModel)]=\"responses.skillGuess\">\n                    </mat-form-field>\n                </div>\n            </div>\n        </div>\n\n\n        <div class=\"row mt-3\">\n            <div class=\"col\">\n                <h5>Pick 9 maps for the NGS player 6 map pool.</h5>\n            </div>\n        </div>\n        <div class=\"row\" *ngIf=\"pickedMaps.length<9\">\n            <div class=\"col\">\n                <mat-form-field class=\"mat-FullWidth\">\n                    <mat-select placeholder=\"Select a map:\" [(ngModel)]=\"selectedMap\" disableOptionCentering>\n                        <mat-option *ngFor=\"let map of filterMaps()\" [value]=\"map\">{{map}}</mat-option>\n                    </mat-select>\n                </mat-form-field>\n            </div>\n            <div class=\"col\">\n                <button class=\"btn btn-primary\" (click)=\"addMap(selectedMap)\">Select Map</button>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col\">\n                <h5>Selected Maps:</h5>\n                <br>\n                <div> </div>\n                <table>\n                    <tr *ngFor=\"let map of pickedMaps\">\n                        <td class=\"tdClass\">\n                            {{map}}\n                        </td>\n                        <td class=\"tdClass\">\n                            <span class=\"finger removeClass bg-danger\" (click)=\"remove(map)\"> X </span>\n                        </td>\n                    </tr>\n                </table>\n            </div>\n        </div>\n\n        <div class=\"row mt-3\">\n            <div class=\"col\">\n                <h5>What coastal division do you prefer? East, West, Either</h5>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col\">\n                <mat-radio-group [(ngModel)]='responses.eastWest'>\n                    <mat-radio-button class=\"example-margin\" value=\"east\">East</mat-radio-button>\n                </mat-radio-group>\n            </div>\n            <div class=\"col\">\n                <mat-radio-group [(ngModel)]='responses.eastWest'>\n                    <mat-radio-button class=\"example-margin\" value=\"west\">West</mat-radio-button>\n                </mat-radio-group>\n            </div>\n            <div class=\"col\">\n                <mat-radio-group [(ngModel)]='responses.eastWest'>\n                    <mat-radio-button class=\"example-margin\" value=\"either\">Either</mat-radio-button>\n                </mat-radio-group>\n            </div>\n        </div>\n\n        <div class=\"row mt-3\">\n            <div class=\"col\">\n                <h5>Season 6 Registration Check List</h5>\n                <div>\n                    <table>\n                        <tr>\n                            <td>\n                                At least 5 members on team.\n                            </td>\n                            <td>\n                                <span *ngIf=\"!checkTeamMates()\"><i class=\"material-icons text-danger\">close</i></span><span *ngIf=\"checkTeamMates()\" class=\"material-icons text-success\">check</span>\n                            </td>\n                        </tr>\n                        <tr>\n                            <td>Maps Picked for Pool</td>\n                            <td><span *ngIf=\"pickedMaps.length!=9\"><i class=\"material-icons text-danger\">close</i></span><span *ngIf=\"pickedMaps.length==9\" class=\"material-icons text-success\">check</span></td>\n                        </tr>\n                        <tr>\n                            <td>Season 6 Questionnaire Completed </td>\n                            <td><span *ngIf=\"!checkQuestionnaire()\"><i class=\"material-icons text-danger\">close</i></span><span *ngIf=\"checkQuestionnaire()\" class=\"material-icons text-success\">check</span></td>\n                        </tr>\n\n                    </table>\n\n                </div>\n            </div>\n            <div class=\"col vertCentButton\">\n                <button [disabled]=\"!checkValid() || responses.registered\" (click)=\"completeRegistration()\" class=\"btn btn-info\">Register for Season 6!</button>\n            </div>\n        </div>\n    </div>\n\n</div>"

/***/ }),

/***/ "./src/app/questionnaire/questionnaire.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/questionnaire/questionnaire.component.ts ***!
  \**********************************************************/
/*! exports provided: QuestionnaireComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestionnaireComponent", function() { return QuestionnaireComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_team_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/team.service */ "./src/app/services/team.service.ts");
/* harmony import */ var _services_utilities_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/utilities.service */ "./src/app/services/utilities.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var QuestionnaireComponent = /** @class */ (function () {
    function QuestionnaireComponent(teamService, util) {
        this.teamService = teamService;
        this.util = util;
        this.passedTeam = {};
        this.responses = {};
        this.pickedMaps = [];
        this.maps = {
            ControlPoints: 'Sky Temple',
            TowersOfDoom: 'Towers of Doom',
            BattlefieldOfEternity: 'Battlefield of Eternity',
            CursedHollow: 'Cursed Hollow',
            DragonShire: 'Dragon Shire',
            HauntedWoods: 'Garden of Terror',
            Shrines: 'Infernal Shrines',
            Crypts: 'Tomb of the Spider Queen',
            Volskaya: 'Volskaya Foundry',
            'Warhead Junction': 'Warhead Junction',
            BraxisHoldout: 'Braxis Holdout',
            Hanamura: 'Hanamura',
            AlteracPass: 'Alterac Pass'
        };
    }
    Object.defineProperty(QuestionnaireComponent.prototype, "team", {
        set: function (_team) {
            if (_team != undefined || _team != null) {
                this.passedTeam = _team;
                if (_team.questionnaire != null && _team.questionnaire != undefined) {
                    this.responses = _team.questionnaire;
                    if (_team.questionnaire.pickedMaps != null && _team.questionnaire.pickedMaps != undefined) {
                        this.pickedMaps = _team.questionnaire.pickedMaps;
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    QuestionnaireComponent.prototype.checkTeamMates = function () {
        if (this.passedTeam && this.passedTeam.teamMembers) {
            if (this.passedTeam.teamMembers.length >= 5) {
                return true;
            }
        }
        return false;
    };
    QuestionnaireComponent.prototype.completeRegistration = function () {
        if (this.checkTeamMates() && this.checkQuestionnaire() && this.pickedMaps.length == 9) {
            this.responses['pickedMaps'] = this.pickedMaps;
            this.responses['registered'] = true;
            this.teamService.saveTeamQuestionnaire(this.passedTeam.teamName_lower, this.responses).subscribe(function (res) {
                console.log(res);
            }, function (err) {
                console.log(err);
            });
        }
        else {
            alert('you tricked me');
        }
    };
    QuestionnaireComponent.prototype.checkQuestionnaire = function () {
        if (this.responses.lastSeason == 'yes') {
            return this.util.returnBoolByPath(this.responses, 'eastWest') &&
                this.util.returnBoolByPath(this.responses, 'oldTeam') &&
                this.util.returnBoolByPath(this.responses, 'oldDivision') &&
                this.util.returnBoolByPath(this.responses, 'returningPlayers') &&
                this.util.returnBoolByPath(this.responses, 'returningPlayersDiv') &&
                this.util.returnBoolByPath(this.responses, 'otherLeagues');
        }
        else if (this.responses.lastSeason == 'no') {
            return this.util.returnBoolByPath(this.responses, 'eastWest') &&
                this.util.returnBoolByPath(this.responses, 'otherLeagues') &&
                this.util.returnBoolByPath(this.responses, 'skillGuess');
        }
        else {
            return false;
        }
    };
    QuestionnaireComponent.prototype.checkValid = function () {
        return this.checkTeamMates() && this.checkQuestionnaire() && this.pickedMaps.length == 9;
    };
    QuestionnaireComponent.prototype.remove = function (map) {
        var ind = this.pickedMaps.indexOf(map);
        this.pickedMaps.splice(ind, 1);
    };
    QuestionnaireComponent.prototype.filterMaps = function () {
        var _this = this;
        var returnArray = [];
        var keys = Object.keys(this.maps);
        keys.forEach(function (key) {
            if (_this.pickedMaps.indexOf(_this.maps[key]) == -1) {
                returnArray.push(_this.maps[key]);
            }
        });
        return returnArray;
    };
    QuestionnaireComponent.prototype.save = function () {
        this.responses['pickedMaps'] = this.pickedMaps;
        this.teamService.saveTeamQuestionnaire(this.passedTeam.teamName_lower, this.responses).subscribe(function (res) {
            console.log(res);
        }, function (err) {
            console.log(err);
        });
    };
    QuestionnaireComponent.prototype.addMap = function (map) {
        this.pickedMaps.push(map);
    };
    QuestionnaireComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], QuestionnaireComponent.prototype, "team", null);
    QuestionnaireComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-questionnaire',
            template: __webpack_require__(/*! ./questionnaire.component.html */ "./src/app/questionnaire/questionnaire.component.html"),
            styles: [__webpack_require__(/*! ./questionnaire.component.css */ "./src/app/questionnaire/questionnaire.component.css")]
        }),
        __metadata("design:paramtypes", [_services_team_service__WEBPACK_IMPORTED_MODULE_1__["TeamService"], _services_utilities_service__WEBPACK_IMPORTED_MODULE_2__["UtilitiesService"]])
    ], QuestionnaireComponent);
    return QuestionnaireComponent;
}());



/***/ }),

/***/ "./src/app/reporting/reporting-deck/reporting-deck.component.css":
/*!***********************************************************************!*\
  !*** ./src/app/reporting/reporting-deck/reporting-deck.component.css ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".FullWidth {\n    width: 100%;\n}\n\n.invalid {\n    color: red;\n}\n\n.matchBox {\n    border-left-style: solid;\n    border-right-style: solid;\n    border-width: 2px;\n    border-top-style: solid;\n    border-color: grey;\n    padding: 25px;\n}\n\n.matchBoxPadder {\n    padding: 25px;\n}\n\n.banBox {\n    border-top-style: solid;\n}\n\n.reportingDiv {\n    border-style: solid;\n    border-width: 2px;\n    border-color: grey;\n    padding: 10px;\n}\n\n.m-t-20 {\n    margin-top: 20px\n}\n\n.m-t-10 {\n    margin-top: 10px\n}\n\n.m-t-5 {\n    margin-top: 5px;\n}\n\n.gameBorder {\n    border-bottom-style: solid;\n    padding-bottom: 10px;\n}"

/***/ }),

/***/ "./src/app/reporting/reporting-deck/reporting-deck.component.html":
/*!************************************************************************!*\
  !*** ./src/app/reporting/reporting-deck/reporting-deck.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <div class=\"row bg-white\">\n        <div class=\"col\">\n            <div class=\"row matchBoxPadder finger\" [ngClass]=\"{'matchBox':show}\" (click)=\"showHide()\">\n                <div class=\"col\">\n                    <div *ngIf=\"recMatch.home.teamName\">{{recMatch.home.teamName}}</div>\n                </div>\n                <div class=\"col\">\n                    - VS -\n                </div>\n                <div class=\"col\">\n                    <div *ngIf=\"recMatch.away.teamName\">{{recMatch.away.teamName}} <i *ngIf=\"!show\" class=\"float-right material-icons\">arrow_drop_down</i><i *ngIf=\"show\" class=\"float-right material-icons\">arrow_drop_up</i></div>\n                </div>\n            </div>\n\n            <div class=\"row reportingDiv\" *ngIf=\"show\">\n                <div class=\"col\">\n                    <div class=\"row m-t-20\">\n                        <div class=\"col\">\n                            Home Map Ban\n                            <div class=\"row m-t-5\">\n                                <div class=\"col\">\n                                    <mat-select placeholder=\"Map \" [(ngModel)]=\"mapBans.home\">\n                                        <mat-option *ngFor=\"let map of maps | keyvalue\" [value]=\"map.value\">{{map.value}}</mat-option>\n                                    </mat-select>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col\">\n\n                        </div>\n                        <div class=\"col\">\n                            Away Map Ban\n                            <div class=\"row\">\n                                <div class=\"col\">\n                                    <mat-select placeholder=\"Map \" [(ngModel)]=\"mapBans.away\">\n                                        <mat-option *ngFor=\"let map of maps | keyvalue\" [value]=\"map.value\">{{map.value}}</mat-option>\n                                    </mat-select>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row gameBorder\" *ngFor=\"let game of games | keyvalue\">\n\n                        <div class=\"col\">\n                            <div class=\"row m-t-20\">\n                                <div class=\"col\">\n                                    Game {{game.key}} <span *ngIf=\"!recMatch.reported\" (click)=\"removeGame(game.key, games)\"><i class=\"float-right material-icons\">close</i></span>\n                                </div>\n                            </div>\n                            <!-- report hero bans -->\n                            <div class=\"row m-t-10\">\n                                <div class=\"col\">\n                                    Home Hero Bans: <span *ngIf=\"game.value.homeBans.length == 3\"><i class=\"material-icons text-success\">done</i></span>\n\n                                    <div class=\"row m-t-5\" *ngIf=\"game.value.homeBans.length<3\">\n                                        <div class=\" col \">\n                                            <mat-select placeholder=\"Hero Banned \" [(ngModel)]=\"game.value.tmp.leftSelect \">\n                                                <!-- heroes | keyvalue -->\n                                                <mat-option *ngFor=\"let hero of returnFilteredHeroes(game)\" [value]=\"hero \">{{hero}}</mat-option>\n                                            </mat-select>\n                                        </div>\n                                        <div class=\"col \">\n                                            <button [disabled]=\"!game.value.tmp.leftSelect || recMatch.reported\" (click)=\"addBan(game.value.tmp.leftSelect, game.value.homeBans) \"> Add Ban </button>\n\n                                        </div>\n                                    </div>\n                                    <div class=\"m-t-10 banBox\">\n                                        <div *ngFor=\"let ban of game.value.homeBans\">{{ban}} <span *ngIf=\"!recMatch.reported\" (click)=\"removeBan(ban, game.value.homeBans)\"><i\n                                                    class=\"float-right material-icons\">close</i></span></div>\n                                    </div>\n\n                                </div>\n                                <div class=\"col \">\n                                    <!-- space holder -->\n                                </div>\n                                <div class=\"col \">\n                                    Away Hero Bans: <span *ngIf=\"game.value.awayBans.length == 3\"><i class=\"material-icons text-success\">done</i></span>\n\n                                    <div class=\"row m-t-5 \" *ngIf=\"game.value.awayBans.length<3 \">\n                                        <div class=\"col \">\n                                            <mat-select placeholder=\"Hero Banned \" [(ngModel)]=\"game.value.tmp.rightSelect \">\n                                                <!-- heroes | keyvalue -->\n                                                <mat-option *ngFor=\"let hero of returnFilteredHeroes(game)  \" [value]=\"hero \">{{hero}}</mat-option>\n                                            </mat-select>\n                                        </div>\n                                        <div class=\"col\">\n                                            <button [disabled]=\"!game.value.tmp.rightSelect || recMatch.reported\" (click)=\"addBan(game.value.tmp.rightSelect, game.value.awayBans) \">Add Ban </button>\n                                        </div>\n                                    </div>\n                                    <div class=\"banBox m-t-10\">\n                                        <div *ngFor=\"let ban of game.value.awayBans \">{{ban}}<span *ngIf=\"!recMatch.reported\" (click)=\"removeBan(ban, game.value.awayBans) \"><i\n                                                    class=\"float-right material-icons \">close</i></span></div>\n                                    </div>\n\n                                </div>\n                            </div>\n                            <!-- report match winner -->\n                            <div class=\"row m-t-20 \">\n                                <div class=\"col \">\n                                    Who won this game? <span *ngIf=\"game.value.winner\"><i class=\"material-icons text-success\">done</i></span>\n                                </div>\n                            </div>\n                            <div class=\"row m-t-5 \">\n                                <div class=\"col \">\n                                    <mat-radio-group [(ngModel)]='game.value.winner'>\n                                        <mat-radio-button class=\"example-margin\" [disabled]=\"recMatch.reported\" value=\"home\">Home</mat-radio-button>\n                                    </mat-radio-group>\n                                </div>\n                                <div class=\"col \">\n\n                                </div>\n                                <div class=\"col \">\n                                    <mat-radio-group [(ngModel)]='game.value.winner'>\n                                        <mat-radio-button class=\"example-margin\" [disabled]=\"recMatch.reported\" value=\"away\">Away</mat-radio-button>\n                                    </mat-radio-group>\n                                </div>\n                            </div>\n                            <!-- match replay -->\n                            <div class=\"row m-t-20\" *ngIf=\"!recMatch.reported\">\n                                <div class=\"col\" *ngIf=\"!game.value.replay else fileReported\">\n                                    Select file*:\n                                    <input type=\"file\" ngf accept=\".StormReplay\" [(file)]=\"game.value.replay\">\n                                </div>\n                                <ng-template #fileReported>\n                                    <div class=\"col-7\">\n                                        {{game.value.replay.name}} <span *ngIf=\"game.value.replay\"><i class=\"material-icons text-success\">done</i></span>\n                                    </div>\n                                    <div class=\"col-2\">\n                                        <span class=\"float-right finger\" (click)=\"resetReplay(game)\"><i class=\"material-icons\">close</i> Remove</span>\n                                    </div>\n                                </ng-template>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row m-t-20\">\n                        <div class=\"col\" *ngIf=\"showAdd && !recMatch.reported\">\n                            <button class=\"btn btn-primary\" (click)=\"addGame() \">Add Game</button>\n                        </div>\n                        <div class=\"col\" *ngIf=\"showReport\">\n                            <button class=\"btn btn-success\" (click)=\"report() \">Report Match!</button>\n                        </div>\n                    </div>\n\n\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/reporting/reporting-deck/reporting-deck.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/reporting/reporting-deck/reporting-deck.component.ts ***!
  \**********************************************************************/
/*! exports provided: ReportingDeckComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportingDeckComponent", function() { return ReportingDeckComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_schedule_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/schedule.service */ "./src/app/services/schedule.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_services_utilities_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/utilities.service */ "./src/app/services/utilities.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ReportingDeckComponent = /** @class */ (function () {
    function ReportingDeckComponent(scheduleService, util) {
        this.scheduleService = scheduleService;
        this.util = util;
        this.hideButton = false;
        this.maps = {
            ControlPoints: 'Sky Temple',
            TowersOfDoom: 'Towers of Doom',
            HauntedMines: 'Haunted Mines',
            BattlefieldOfEternity: 'Battlefield of Eternity',
            BlackheartsBay: "Blackheart's Bay",
            CursedHollow: 'Cursed Hollow',
            DragonShire: 'Dragon Shire',
            HauntedWoods: 'Garden of Terror',
            Shrines: 'Infernal Shrines',
            Crypts: 'Tomb of the Spider Queen',
            Volskaya: 'Volskaya Foundry',
            'Warhead Junction': 'Warhead Junction',
            BraxisHoldout: 'Braxis Holdout',
            Hanamura: 'Hanamura',
            AlteracPass: 'Alterac Pass'
        };
        this.mapBans = {
            away: '',
            home: ''
        };
        this.games = {};
        this.showAdd = true;
        this.showReport = false;
        this.heroes = {
            "Abat": "Abathur",
            "Alar": "Alarak",
            "Alex": "Alexstrasza",
            "HANA": "Ana",
            "Anub": "Anub'arak",
            "Arts": "Artanis",
            "Arth": "Arthas",
            "Auri": "Auriel",
            "Azmo": "Azmodan",
            "Fire": "Blaze",
            "Faer": "Brightwing",
            "Amaz": "Cassia",
            "Chen": "Chen",
            "CCho": "Cho",
            "Chro": "Chromie",
            "DECK": "Deckard",
            "Deha": "Dehaka",
            "Diab": "Diablo",
            "DVA0": "D.Va",
            "L90E": "E.T.C.",
            "Fals": "Falstad",
            "FENX": "Fenix",
            "Gall": "Gall",
            "Garr": "Garrosh",
            "Tink": "Gazlowe",
            "Genj": "Genji",
            "Genn": "Greymane",
            "Guld": "Gul'dan",
            "Hanz": "Hanzo",
            "Illi": "Illidan",
            "Jain": "Jaina",
            "Crus": "Johanna",
            "Junk": "Junkrat",
            "Kael": "Kael'thas",
            "KelT": "Kel'Thuzad",
            "Kerr": "Kerrigan",
            "Monk": "Kharazim",
            "Leor": "Leoric",
            "LiLi": "Li Li",
            "Wiza": "Li-Ming",
            "Medi": "Lt. Morales",
            "Luci": "Lucio",
            "Drya": "Lunara",
            "Maie": "Maiev",
            "Malf": "Malfurion",
            "Malg": "Mal'Ganis",
            "MALT": "Malthael",
            "Mdvh": "Medivh",
            "Mura": "Muradin",
            "Murk": "Murky",
            "Witc": "Nazeebo",
            "Nova": "Nova",
            "Oprh": "Orphea",
            "Prob": "Probius",
            "Ragn": "Ragnaros",
            "Rayn": "Raynor",
            "Rehg": "Rehgar",
            "Rexx": "Rexxar",
            "Samu": "Samuro",
            "Sgth": "Sgt. Hammer",
            "Barb": "Sonya",
            "Stit": "Stitches",
            "STUK": "Stukov",
            "Sylv": "Sylvanas",
            "Tass": "Tassadar",
            "Butc": "The Butcher",
            "Lost": "The Lost Vikings",
            "Thra": "Thrall",
            "Tra0": "Tracer",
            "Tych": "Tychus",
            "Tyrl": "Tyrael",
            "Tyrd": "Tyrande",
            "Uthe": "Uther",
            "VALE": "Valeera",
            "Demo": "Valla",
            "Vari": "Varian",
            "Necr": "Xul",
            "YREL": "Yrel",
            "Zaga": "Zagara",
            "Zary": "Zarya",
            "Zera": "Zeratul",
            "ZULJ": "Zul'jin"
        };
        this.awayScoreControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required
        ]);
        this.homeScoreControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required
        ]);
        this.replay1Control = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required
        ]);
        this.replay2Control = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required
        ]);
        this.replay3Control = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required
        ]);
        this.reportForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            awayScore: this.awayScoreControl,
            homeScore: this.homeScoreControl,
            replay1: this.replay1Control,
            replay2: this.replay2Control
        });
        this.thirdReplayRequired = false;
        this.scoreError = '';
        this.show = false;
    }
    Object.defineProperty(ReportingDeckComponent.prototype, "match", {
        set: function (match) {
            if (match != null && match != undefined) {
                console.log(match);
                this.recMatch = match;
            }
            if (this.recMatch.other != null && this.recMatch.mapBans != undefined) {
                this.games = this.recMatch.other;
            }
            if (this.recMatch.mapBans != null && this.recMatch.mapBans != undefined) {
                this.mapBans = this.recMatch.mapBans;
            }
            if (this.recMatch.reported) {
                this.hideButton = true;
                this.formControlsDisable();
            }
        },
        enumerable: true,
        configurable: true
    });
    ReportingDeckComponent.prototype.removeBan = function (hero, arr) {
        var ind = arr.indexOf(hero);
        if (ind != -1) {
            arr = arr.splice(ind, 1);
        }
    };
    ReportingDeckComponent.prototype.addGame = function () {
        var keys = Object.keys(this.games);
        if (keys.length < 3) {
            this.games[(keys.length + 1).toString()] = {
                homeBans: [],
                awayBans: [],
                winner: '',
                replay: '',
                tmp: {}
            };
        }
        if (keys.length >= 1) {
            this.showReport = true;
        }
        if (keys.length >= 2) {
            this.showAdd = false;
        }
        console.log(this.games);
    };
    ReportingDeckComponent.prototype.returnFilteredHeroes = function (game) {
        var _this = this;
        var disArr = [];
        var currentArr = game.value.homeBans.concat(game.value.awayBans);
        var keys = Object.keys(this.heroes);
        keys.forEach(function (element) {
            var heroName = _this.heroes[element];
            if (currentArr.indexOf(heroName) == -1) {
                disArr.push(_this.heroes[element]);
            }
        });
        return disArr;
    };
    ReportingDeckComponent.prototype.addBan = function (hero, arr) {
        arr.push(hero);
        hero = null;
    };
    ReportingDeckComponent.prototype.resetReplay = function (game) {
        game.value.replay = null;
    };
    ReportingDeckComponent.prototype.formControlsDisable = function () {
        this.awayScoreControl.disable();
        this.homeScoreControl.disable();
        this.replay1Control.disable();
        this.replay2Control.disable();
    };
    ReportingDeckComponent.prototype.hideReplaySubmit = function () {
        if (this.recMatch.replays) {
            return false;
        }
        else {
            return true;
        }
    };
    ReportingDeckComponent.prototype.removeGame = function (game, games) {
        delete games[game];
    };
    ReportingDeckComponent.prototype.ngOnInit = function () {
        this.util.markFormGroupTouched(this.reportForm);
    };
    ReportingDeckComponent.prototype.scoreSelected = function (changed) {
        if (this.homeScore + this.awayScore > 2) {
            this.thirdReplayRequired = true;
        }
        else {
            this.thirdReplayRequired = false;
            this.replay3 = null;
        }
    };
    ReportingDeckComponent.prototype.disableSubmit = function () {
        var disable = true;
        if (this.homeScore == 2) {
            if (this.awayScore <= 1) {
                disable = false;
                this.scoreError = '';
            }
            else {
                disable = true;
                this.scoreError = 'Invalid Score';
            }
        }
        else if (this.homeScore == 1) {
            if (this.awayScore == 2) {
                disable = false;
                this.scoreError = '';
            }
            else {
                disable = true;
                this.scoreError = 'Invalid Score';
            }
        }
        else if (this.homeScore == 0) {
            if (this.awayScore == 2) {
                disable = false;
                this.scoreError = '';
            }
            else {
                disable = true;
                this.scoreError = 'Invalid Score';
            }
        }
        if (this.thirdReplayRequired) {
            if (this.homeScore != null && this.awayScore != null && this.replay1 != null && this.replay2 != null && this.replay3 != null) {
                disable = false;
            }
            else {
                disable = true;
            }
        }
        else {
            if (this.homeScore != null && this.awayScore != null && this.replay1 != null && this.replay2 != null) {
                disable = false;
            }
            else {
                disable = true;
            }
        }
        return disable;
    };
    ReportingDeckComponent.prototype.parseFile = function (replays) {
        console.log(replays);
    };
    ReportingDeckComponent.prototype.showHide = function () {
        this.show = !this.show;
    };
    ReportingDeckComponent.prototype.report = function () {
        var _this = this;
        var submittable = true;
        var report = {
            matchId: this.recMatch.matchId,
            homeTeamScore: 0,
            awayTeamScore: 0
        };
        var otherData = {};
        console.log(this.games);
        var keys = Object.keys(this.games);
        keys.forEach(function (key) {
            var game = _this.games[key];
            if (game.winner == 'home') {
                report.homeTeamScore += 1;
            }
            else if (game.winner == 'away') {
                report.awayTeamScore += 1;
            }
            else {
                submittable = false;
                alert('Game ' + key + ' winner is not selected, can not submit.');
            }
            if (game.replay == null && game.replay == undefined) {
                submittable = false;
                alert('Game ' + key + ' replay is not attached, can not submit.');
            }
            report['replay' + key.toString()] = game.replay;
            var gamenum = key.toString();
            if (game.homeBans.length < 3) {
                alert('Game ' + key + ' home bans is not filled, can not submit.');
                submittable = false;
            }
            if (game.awayBans.length < 3) {
                alert('Game ' + key + ' away bans is not filled, can not submit.');
                submittable = false;
            }
            otherData[gamenum] = {
                awayBans: game.awayBans,
                homeBans: game.homeBans,
                winner: game.winner
            };
        });
        if (report.homeTeamScore == 1 && report.awayTeamScore == 1 || report.awayTeamScore == 1 && report.homeTeamScore == 1) {
            submittable = false;
            alert('This out come is not allowed, matches must end 2-0 or 2-1');
        }
        report['otherDetails'] = JSON.stringify(otherData);
        report['mapBans'] = JSON.stringify(this.mapBans);
        console.log('report ', report);
        if (submittable) {
            this.scheduleService.reportMatch(report).subscribe(function (res) {
                console.log(res);
                _this.recMatch.reported = true;
                _this.showReport = false;
            });
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ReportingDeckComponent.prototype, "match", null);
    ReportingDeckComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-reporting-deck',
            template: __webpack_require__(/*! ./reporting-deck.component.html */ "./src/app/reporting/reporting-deck/reporting-deck.component.html"),
            styles: [__webpack_require__(/*! ./reporting-deck.component.css */ "./src/app/reporting/reporting-deck/reporting-deck.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_services_schedule_service__WEBPACK_IMPORTED_MODULE_1__["ScheduleService"], src_app_services_utilities_service__WEBPACK_IMPORTED_MODULE_3__["UtilitiesService"]])
    ], ReportingDeckComponent);
    return ReportingDeckComponent;
}());



/***/ }),

/***/ "./src/app/reporting/reporting.component.css":
/*!***************************************************!*\
  !*** ./src/app/reporting/reporting.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".matchBoxPadder {\n    padding: 25px;\n}"

/***/ }),

/***/ "./src/app/reporting/reporting.component.html":
/*!****************************************************!*\
  !*** ./src/app/reporting/reporting.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container pt-4\">\n    <div class=\"row bg-white forceFull\">\n        <div class=\"col\">\n            <div class=\"row\">\n                <div class=\"col\">\n                    <h2>Match Reporting:</h2>\n                </div>\n            </div>\n            <div class=\"fillUpDeadSpace\" *ngIf=\"noMatches else showMatches\">\n                <div class=\"row mt-3\">\n                    <div class=\"col text-center\">\n                        <h5>Your team doesn't currently have any matches generated by the system</h5>\n                        <h6> Check back later! </h6>\n                    </div>\n                </div>\n            </div>\n            <ng-template #showMatches>\n                <div class=\"row\">\n                    <div class=\"col\">\n                        Home Team\n                    </div>\n                    <div class=\"col\">\n\n                    </div>\n                    <div class=\"col\">\n                        Away Team\n                    </div>\n                </div>\n                <div class=\"row mt-2\" *ngFor=\"let round of rounds | keyvalue\">\n                    <div class=\"col\">\n                        <h4>Week: {{round.key}}</h4>\n                        <div *ngIf=\"round.value.length>0 else bye\">\n                            <div class=\"row\" *ngFor=\"let match of round.value\">\n                                <div class=\"col\">\n                                    <app-reporting-deck [match]=\"match\"></app-reporting-deck>\n                                </div>\n                            </div>\n                        </div>\n\n                    </div>\n                </div>\n            </ng-template>\n        </div>\n    </div>\n</div>\n<ng-template #bye>\n    <div class=\"row mt-2 matchBoxPadder\">\n        <div class=\"col text-center\">\n            <span>BYE</span>\n        </div>\n    </div>\n</ng-template>"

/***/ }),

/***/ "./src/app/reporting/reporting.component.ts":
/*!**************************************************!*\
  !*** ./src/app/reporting/reporting.component.ts ***!
  \**************************************************/
/*! exports provided: ReportingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportingComponent", function() { return ReportingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_schedule_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/schedule.service */ "./src/app/services/schedule.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _services_team_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/team.service */ "./src/app/services/team.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ReportingComponent = /** @class */ (function () {
    function ReportingComponent(Auth, teamService, route, scheduleService) {
        this.Auth = Auth;
        this.teamService = teamService;
        this.route = route;
        this.scheduleService = scheduleService;
        if (this.route.snapshot.params['id']) {
            this.recTeam = this.route.snapshot.params['id'];
        }
    }
    ReportingComponent.prototype.ngOnInit = function () {
        var _this = this;
        var getTeam;
        if (this.recTeam) {
            getTeam = this.recTeam;
            getTeam = this.teamService.realTeamName(getTeam);
        }
        else {
            getTeam = this.Auth.getTeam();
        }
        this.scheduleService.getTeamSchedules(6, getTeam).subscribe(function (res) {
            var matches = res;
            if (matches.length == 0) {
                _this.noMatches = true;
            }
            else {
                _this.noMatches = false;
            }
            var _loop_1 = function () {
                if (_this.rounds == null || _this.rounds == undefined) {
                    _this.rounds = {};
                }
                var realMatchNumber = i + 1;
                _this.rounds[realMatchNumber.toString()] = [];
                matches.forEach(function (match) {
                    if (match.round == realMatchNumber) {
                        if (_this.rounds[realMatchNumber.toString()] == null || _this.rounds[realMatchNumber.toString()] == undefined) {
                            _this.rounds[realMatchNumber.toString()] = [];
                        }
                        _this.rounds[realMatchNumber.toString()].push(match);
                    }
                });
            };
            for (var i = 0; i <= matches.length; i++) {
                _loop_1();
            }
            _this.rounds;
        }, function (err) { console.log(err); });
    };
    ReportingComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-reporting',
            template: __webpack_require__(/*! ./reporting.component.html */ "./src/app/reporting/reporting.component.html"),
            styles: [__webpack_require__(/*! ./reporting.component.css */ "./src/app/reporting/reporting.component.css")]
        }),
        __metadata("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"], _services_team_service__WEBPACK_IMPORTED_MODULE_4__["TeamService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], _services_schedule_service__WEBPACK_IMPORTED_MODULE_2__["ScheduleService"]])
    ], ReportingComponent);
    return ReportingComponent;
}());



/***/ }),

/***/ "./src/app/schedule/match-schedule/match-schedule.component.css":
/*!**********************************************************************!*\
  !*** ./src/app/schedule/match-schedule/match-schedule.component.css ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/schedule/match-schedule/match-schedule.component.html":
/*!***********************************************************************!*\
  !*** ./src/app/schedule/match-schedule/match-schedule.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container pt-4 forceFull\">\n    <div class=\"row\">\n        <div class=\"col\">\n            <div *ngIf=\"checkDate()\" class=\"row\">\n                <div class=\"col text-center text-danger\">\n\n                    This match was not scheduled before it's schedule due date!\n                    <div> Please contact an admin</div>\n\n                </div>\n            </div>\n\n            <div class=\"row\" *ngIf=\"match\">\n                <div class=\"col\">\n                    <div class=\"row\">\n                        <div class=\"col\">\n                            Week {{match.round}}\n                        </div>\n                    </div>\n                    <div class=\"row mt-2\">\n                        <div class=\"col text-center\">\n                            <div *ngIf=\"match.home.teamName\">{{match.home.teamName}}</div>\n                        </div>\n                        <div class=\"col text-center\">\n                            - VS -\n                        </div>\n                        <div class=\"col text-center\">\n                            <div *ngIf=\"match.away.teamName; else bye\">{{match.away.teamName}}</div>\n                        </div>\n                    </div>\n                </div>\n\n            </div>\n\n            <div class=\"row mt-4\">\n                <div class=\"col-6\">\n                    <mat-form-field class=\"mat-FullWidth\">\n                        <input matInput [matDatepicker]=\"picker\" placeholder=\"Choose a date\" [(ngModel)]=\"mydate\">\n                        <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n                        <mat-datepicker #picker></mat-datepicker>\n                    </mat-form-field>\n                </div>\n                <div class=\"col-6\">\n                    <div class=\"row\">\n                        <div class=\"col\">\n                            <mat-form-field class=\"mat-FullWidth\">\n                                <mat-select placeholder=\"Start Time:\" [(ngModel)]=\"time\">\n                                    <mat-option *ngFor=\"let time of times\" [value]=\"time\">\n                                        {{time}}\n                                    </mat-option>\n                                </mat-select>\n                                <mat-hint>Times are localized</mat-hint>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col\">\n                            <mat-form-field class=\"mat-FullWidth\">\n                                <mat-select placeholder=\"AM/PM:\" [(ngModel)]=\"suffix\">\n                                    <mat-option *ngFor=\"let suffix of amPm\" [value]=\"suffix\">\n                                        {{suffix}}\n                                    </mat-option>\n                                </mat-select>\n                            </mat-form-field>\n                        </div>\n                    </div>\n\n\n                </div>\n            </div>\n            <div class=\"row mt-2\">\n                <div class=\"col text-center\">\n                    <button [disabled]=\"checkDate()\" type=\"button\" class=\"btn btn-success\" (click)=\"saveSched()\">Save</button>\n                </div>\n            </div>\n\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/schedule/match-schedule/match-schedule.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/schedule/match-schedule/match-schedule.component.ts ***!
  \*********************************************************************/
/*! exports provided: MatchScheduleComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatchScheduleComponent", function() { return MatchScheduleComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_schedule_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/schedule.service */ "./src/app/services/schedule.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MatchScheduleComponent = /** @class */ (function () {
    function MatchScheduleComponent(route, scheduleService, router) {
        this.route = route;
        this.scheduleService = scheduleService;
        this.router = router;
        this.mydate = new Date(); //local prop that holds the selected date by user from the calendar 
        this.times = []; //local array that is populated progromatticaly to give users a drop down of times on 15 min interval to select
        this.amPm = ['PM', 'AM']; //local propery holds array for the am/pm dropdown
        //get the id provided in the URL route
        this.matchId = this.route.snapshot.params['id'];
    }
    MatchScheduleComponent.prototype.ngOnInit = function () {
        var _this = this;
        //get the match from the ID we receieved
        this.scheduleService.getMatchInfo(6, this.matchId).subscribe(function (res) {
            //assign the result to local prop match
            _this.match = res;
        }, function (err) { console.log(err); });
        //build out the selectable times for the user, in 15 min intervals
        for (var i = 1; i < 13; i++) {
            for (var j = 0; j <= 3; j++) {
                var min = j * 15;
                if (min == 0) {
                    min = '00';
                }
                var time = i + ":" + min;
                this.times.push(time);
            }
        }
    };
    MatchScheduleComponent.prototype.checkDate = function () {
        var todayDate = new Date().getTime();
        var ret = false;
        if (this.match['scheduleDeadline']) {
            var intDate = parseInt(this.match['scheduleDeadline']);
            if (todayDate > intDate) {
                ret = true;
            }
        }
        return ret;
    };
    //function from click to save schedule
    MatchScheduleComponent.prototype.saveSched = function () {
        var _this = this;
        //calculate the millisecond date of the scheduled start of the match cause that's easy to save.
        //TODO: this might go into a service because I think it's used other places
        var years = this.mydate.getFullYear();
        var month = this.mydate.getMonth();
        var day = this.mydate.getDate();
        var colonSplit = this.time.split(':');
        colonSplit[1] = parseInt(colonSplit[1]);
        if (this.suffix == 'PM') {
            colonSplit[0] = parseInt(colonSplit[0]);
            colonSplit[0] += 12;
        }
        var setDate = new Date();
        setDate.setFullYear(years);
        setDate.setMonth(month);
        setDate.setDate(day);
        setDate.setHours(colonSplit[0]);
        setDate.setMinutes(colonSplit[1]);
        var msDate = setDate.getTime();
        var endDate = msDate + 5400000;
        this.scheduleService.scheduleMatchTime(this.match.matchId, msDate, endDate).subscribe(function (res) {
            //TODO: will i need to implement a route here?
            _this.router.navigateByUrl('/schedule/teamSchedule');
        }, function (err) {
            console.log(err);
        });
    };
    MatchScheduleComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-match-schedule',
            template: __webpack_require__(/*! ./match-schedule.component.html */ "./src/app/schedule/match-schedule/match-schedule.component.html"),
            styles: [__webpack_require__(/*! ./match-schedule.component.css */ "./src/app/schedule/match-schedule/match-schedule.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], src_app_services_schedule_service__WEBPACK_IMPORTED_MODULE_2__["ScheduleService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], MatchScheduleComponent);
    return MatchScheduleComponent;
}());



/***/ }),

/***/ "./src/app/schedule/schedule-view/schedule-view.component.css":
/*!********************************************************************!*\
  !*** ./src/app/schedule/schedule-view/schedule-view.component.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".vertical-middle {\n    margin-top: auto;\n    margin-bottom: auto;\n}"

/***/ }),

/***/ "./src/app/schedule/schedule-view/schedule-view.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/schedule/schedule-view/schedule-view.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container pt-4\">\n    <div class=\"row\">\n        <div class=\"col\">\n            <div class=\"row\" *ngIf=\"!this.provDiv; else provDiv\">\n                <div class=\"col\">\n                    <mat-form-field>\n                        <mat-select placeholder=\"Division:\" [(ngModel)]=\"selectedDivision\" (ngModelChange)=\"calculateRounds()\" disableOptionCentering>\n                            <mat-option *ngFor=\"let division of divisions; let i = index\" [value]=\"division\">{{division.displayName}}</mat-option>\n                        </mat-select>\n                    </mat-form-field>\n                </div>\n                <div class=\"col\">\n                    <mat-form-field>\n                        <mat-select placeholder=\"Round:\" [(ngModel)]=\"selectedRound\" (ngModelChange)=\"getMatches()\" disableOptionCentering>\n                            <mat-option *ngFor=\"let round of rounds; let i = index\" [value]=\"round\">{{round}}</mat-option>\n                        </mat-select>\n                    </mat-form-field>\n                </div>\n            </div>\n            <ng-template #provDiv>\n                <div class=\"row\" *ngIf=\"rounds.length>0\">\n                    <div>\n                        <div class=\"col\">\n                            <mat-form-field>\n                                <mat-select placeholder=\"Round:\" [(ngModel)]=\"selectedRound\" (ngModelChange)=\"getMatches()\" disableOptionCentering>\n                                    <mat-option *ngFor=\"let round of rounds; let i = index\" [value]=\"round\">{{round}}</mat-option>\n                                </mat-select>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <!-- <div class=\"fillUpDeadSpace\" *ngIf=\"!selectedRound\"></div> -->\n                </div>\n            </ng-template>\n            <!-- else noMatches -->\n            <div *ngIf=\"matches.length>0 else noMatch\">\n                <div class=\"row\">\n                    <div class=\"col\">\n                        <h2>Matches</h2>\n                    </div>\n                </div>\n                <div class=\"row mt-3\" *ngFor=\"let match of matches\">\n                    <div class=\"col\">\n                        <div class=\"row\">\n                            <div class=\"col-5\">\n                                <div class=\"row\">\n                                    <div class=\"col\">\n                                        <img class=\"img-fluid\" src=\"{{team.imageFQDN(match.home.logo)}}\" width=\"150\" alt=\"Team Logo\">\n                                    </div>\n                                    <div class=\"col vertical-middle\">\n                                        <div *ngIf=\"match.home.teamName\">{{match.home.teamName}}</div>\n\n                                    </div>\n                                    <div class=\"col vertical-middle\">\n                                        <span> {{match.home.wins}} - {{match.home.losses}} </span>\n                                    </div>\n                                </div>\n\n                            </div>\n                            <div class=\"col-2 vertical-middle\">\n                                - VS -\n                            </div>\n                            <div class=\"col-5\">\n                                <div class=\"row\">\n                                    <div class=\"col vertical-middle\">\n                                        <span> {{match.away.wins}} - {{match.away.losses}} </span>\n                                    </div>\n                                    <div class=\"col vertical-middle\">\n                                        <div *ngIf=\"match.away.teamName; else bye\">{{match.away.teamName}}</div>\n                                    </div>\n                                    <div class=\"col\">\n                                        <img class=\"img-fluid\" src=\"{{team.imageFQDN(match.away.logo)}}\" width=\"150\" alt=\"Team Logo\">\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col\">\n\n                            </div>\n                            <div class=\"col-7 text-center\">\n                                Scheduled Time: <span *ngIf=\"match.scheduledTime else tbd\">{{match.friendlyDate}} - {{match.friendlyTime}} {{match.suffix}}</span>\n                                <ng-template #tbd><span> TBD </span></ng-template>\n                            </div>\n                            <div class=\"col\">\n\n                            </div>\n                        </div>\n                        <div class=\"row\" *ngIf=\"match.casterName && match.casterUrl\">\n                            <div class=\"col\"></div>\n                            <div class=\"col-7 text-center\">\n                                <span> Casted by:</span> {{match.casterName}} : <a href=\"{{util.prePendHttp(match.casterUrl)}}\" target=\"_blank\">{{match.casterUrl}}</a>\n                            </div>\n                            <div class=\"col\"></div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<ng-template #bye>\n    BYE\n</ng-template>\n<ng-template #noMatch>\n    <div>No matches currently for this round!</div>\n</ng-template>"

/***/ }),

/***/ "./src/app/schedule/schedule-view/schedule-view.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/schedule/schedule-view/schedule-view.component.ts ***!
  \*******************************************************************/
/*! exports provided: ScheduleViewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScheduleViewComponent", function() { return ScheduleViewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_division_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/division.service */ "./src/app/services/division.service.ts");
/* harmony import */ var src_app_services_schedule_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/schedule.service */ "./src/app/services/schedule.service.ts");
/* harmony import */ var src_app_services_team_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/team.service */ "./src/app/services/team.service.ts");
/* harmony import */ var src_app_services_standings_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/standings.service */ "./src/app/services/standings.service.ts");
/* harmony import */ var src_app_services_utilities_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/utilities.service */ "./src/app/services/utilities.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ScheduleViewComponent = /** @class */ (function () {
    function ScheduleViewComponent(divisionService, standingsService, scheduleService, team, util) {
        this.divisionService = divisionService;
        this.standingsService = standingsService;
        this.scheduleService = scheduleService;
        this.team = team;
        this.util = util;
        this.divisions = [];
        this.standings = [];
        this.matches = [];
        this.rounds = [];
    }
    ScheduleViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.provDiv == undefined && this.provDiv == null) {
            this.divisionService.getDivisionInfo().subscribe(function (res) {
                _this.divisions = res;
            }, function (err) {
                console.log(err);
            });
        }
    };
    Object.defineProperty(ScheduleViewComponent.prototype, "division", {
        set: function (div) {
            if (div != undefined && div != null) {
                this.provDiv = div;
                this.calculateRounds();
            }
        },
        enumerable: true,
        configurable: true
    });
    ScheduleViewComponent.prototype.calculateRounds = function () {
        var roundNumber = 0;
        if (this.provDiv != undefined && this.provDiv != null && this.provDiv.teams != undefined && this.provDiv.teams != null) {
            if (this.provDiv % 2 == 0) {
                roundNumber = this.provDiv.teams.length - 1;
            }
            else {
                roundNumber = this.provDiv.teams.length;
            }
        }
        else if (this.selectedDivision != null && this.selectedDivision != undefined && this.selectedDivision.teams != undefined && this.selectedDivision.teams != null) {
            roundNumber = this.selectedDivision.teams.length - 1;
        }
        this.rounds = [];
        this.matches = [];
        if (roundNumber == 0) {
            roundNumber = 1;
        }
        for (var i = 0; i < roundNumber; i++) {
            this.rounds.push(i + 1);
        }
    };
    ScheduleViewComponent.prototype.getMatches = function () {
        var _this = this;
        var div;
        if (this.provDiv != undefined && this.provDiv != null) {
            div = this.provDiv.divisionConcat;
        }
        else {
            div = this.selectedDivision.divisionConcat;
        }
        var season = 6;
        this.scheduleService.getScheduleMatches(season, div, this.selectedRound).subscribe(function (res) {
            _this.matches = res;
            _this.standingsService.getStandings(_this.provDiv.divisionConcat).subscribe(function (res) {
                _this.standings = res;
                _this.matches.forEach(function (match) {
                    _this.standings.forEach(function (standing) {
                        if (match.home.teamName == standing.teamName) {
                            match.home['losses'] = standing.losses;
                            match.home['wins'] = standing.wins;
                        }
                        if (match.away.teamName == standing.teamName) {
                            match.away['losses'] = standing.losses;
                            match.away['wins'] = standing.wins;
                        }
                    });
                    if (match.scheduledTime) {
                        match['friendlyDate'] = _this.util.getDateFromMS(match.scheduledTime.startTime);
                        match['friendlyTime'] = _this.util.getTimeFromMS(match.scheduledTime.startTime);
                        match['suffix'] = _this.util.getSuffixFromMS(match.scheduledTime.startTime);
                    }
                }, function (err) {
                    console.log(err);
                });
            });
        }, function (err) { console.log(err); });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ScheduleViewComponent.prototype, "division", null);
    ScheduleViewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-schedule-view',
            template: __webpack_require__(/*! ./schedule-view.component.html */ "./src/app/schedule/schedule-view/schedule-view.component.html"),
            styles: [__webpack_require__(/*! ./schedule-view.component.css */ "./src/app/schedule/schedule-view/schedule-view.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_services_division_service__WEBPACK_IMPORTED_MODULE_1__["DivisionService"], src_app_services_standings_service__WEBPACK_IMPORTED_MODULE_4__["StandingsService"], src_app_services_schedule_service__WEBPACK_IMPORTED_MODULE_2__["ScheduleService"], src_app_services_team_service__WEBPACK_IMPORTED_MODULE_3__["TeamService"], src_app_services_utilities_service__WEBPACK_IMPORTED_MODULE_5__["UtilitiesService"]])
    ], ScheduleViewComponent);
    return ScheduleViewComponent;
}());



/***/ }),

/***/ "./src/app/schedule/team-schedule/team-schedule.component.css":
/*!********************************************************************!*\
  !*** ./src/app/schedule/team-schedule/team-schedule.component.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/schedule/team-schedule/team-schedule.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/schedule/team-schedule/team-schedule.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container pt-4\">\n    <div class=\"row forceFull\">\n        <div class=\"col\">\n            <div class=\"row\">\n                <div class=\"col\">\n                    <h2>Matches</h2>\n                </div>\n            </div>\n            <div class=\"fillUpDeadSpace\" *ngIf=\"noMatches else showMatches\">\n                <div class=\"row mt-3\">\n                    <div class=\"col text-center\">\n                        <h5>Your team doesn't currently have any matches generated by the system</h5>\n                        <h6> Check back later! </h6>\n                    </div>\n                </div>\n            </div>\n            <ng-template #showMatches>\n                <div class=\"row mt-2\" *ngFor=\"let round of rounds | keyvalue\">\n                    <div class=\"col\">\n                        <h4>Week: {{round.key}}</h4>\n                        <div *ngIf=\"round.value.length>0 else bye\">\n                            <div class=\"row mt-3\" *ngFor=\"let match of round.value\">\n                                <div class=\"col\">\n                                    <div class=\"row\">\n                                        <div class=\"col text-center text-warning\">\n                                            Scheduling Deadline:\n                                            <span *ngIf=\"match.friendlyDeadline else freeGame\">{{match.friendlyDeadline}}</span>\n                                            <ng-template #freeGame> Open Game or No Deadline Set Yet </ng-template>\n                                        </div>\n                                    </div>\n                                    <div class=\"row mt-3\">\n                                        <div class=\"col-5\">\n                                            <div class=\"row\">\n                                                <div class=\"col\">\n                                                    <img class=\"img-fluid\" src=\"{{team.imageFQDN(match.home.logo)}}\" width=\"150\" alt=\"Team Logo\">\n                                                </div>\n                                                <div class=\"col vertical-middle\">\n                                                    <div *ngIf=\"match.home.teamName\">{{match.home.teamName}}</div>\n\n                                                </div>\n                                                <div class=\"col vertical-middle\">\n                                                    <span> {{match.home.wins}} - {{match.home.losses}} </span>\n                                                </div>\n                                            </div>\n\n                                        </div>\n                                        <div class=\"col-2 vertical-middle\">\n                                            - VS -\n                                        </div>\n                                        <div class=\"col-5\">\n                                            <div class=\"row\">\n                                                <div class=\"col vertical-middle\">\n                                                    <span> {{match.away.wins}} - {{match.away.losses}} </span>\n                                                </div>\n                                                <div class=\"col vertical-middle\">\n                                                    <div *ngIf=\"match.away.teamName; else bye\">{{match.away.teamName}}</div>\n                                                </div>\n                                                <div class=\"col\">\n                                                    <img class=\"img-fluid\" src=\"{{team.imageFQDN(match.away.logo)}}\" width=\"150\" alt=\"Team Logo\">\n                                                </div>\n                                            </div>\n                                        </div>\n                                    </div>\n                                    <div class=\"row\">\n                                        <div class=\"col\">\n\n                                        </div>\n                                        <div class=\"col-7 text-center\">\n                                            <span *ngIf=\"match.scheduledTime else tbd\">Scheduled Time: {{match.friendlyDate}} - {{match.friendlyTime}} {{match.suffix}}</span>\n\n                                            <ng-template #tbd>\n                                                <div class=\"p-1 text-danger\" *ngIf=\"checkDate(match) else timeElapsed\">\n                                                    This match was not scheduled before it's due date contact an admin!\n                                                </div>\n                                                <ng-template #timeElapsed> <button class=\"btn btn-info\" (click)=\"scheduleMatch(match.matchId)\">\n    Schedule this match! </button>\n                                                </ng-template>\n\n                                            </ng-template>\n                                        </div>\n                                        <div class=\"col\">\n\n                                        </div>\n                                    </div>\n                                    <div class=\"row\" *ngIf=\"match.casterName && match.casterUrl\">\n                                        <div class=\"col\"></div>\n                                        <div class=\"col-7 text-center\">\n                                            <span> Casted by:</span> {{match.casterName}} : <a href=\"{{util.prePendHttp(match.casterUrl)}}\" target=\"_blank\">{{match.casterUrl}}</a>\n                                        </div>\n                                        <div class=\"col\"></div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n\n                    </div>\n                </div>\n\n                <!-- <div class=\"row mt-2\" *ngFor=\"let round of rounds | keyvalue\">\n                    <div class=\"col\">\n                        <h4>Round: {{round.key}}</h4>\n                        <div class=\"row\" *ngFor=\"let match of round.value\">\n                            <div class=\"col\">\n                                <div *ngIf=\"match.home.teamName\">{{match.home.teamName}}</div>\n                            </div>\n                            <div class=\"col\">\n                                - VS -\n                            </div>\n                            <div class=\"col\">\n                                <div *ngIf=\"match.away.teamName; else bye\">{{match.away.teamName}}</div>\n                            </div>\n                            <div class=\"col\">\n                                <div [hidden]=\"byeWeekHide(match)\">\n                                    <div *ngIf=\"showSchedule(match); else showLink\">\n                                        {{displayTime(match.scheduledTime.startTime)}}\n                                    </div>\n                                    <ng-template #showLink>\n                                        <a [routerLink]=\"['/schedule/scheduleMatch',match.matchId]\">Schedule this Match!</a>\n                                    </ng-template>\n                                </div>\n\n                            </div>\n                        </div>\n                    </div>\n\n                </div> -->\n            </ng-template>\n\n        </div>\n    </div>\n</div>\n<ng-template #bye>\n    <div class=\"row\">\n        <div class=\"col text-center\">\n            BYE\n        </div>\n    </div>\n\n</ng-template>"

/***/ }),

/***/ "./src/app/schedule/team-schedule/team-schedule.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/schedule/team-schedule/team-schedule.component.ts ***!
  \*******************************************************************/
/*! exports provided: TeamScheduleComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeamScheduleComponent", function() { return TeamScheduleComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var src_app_services_schedule_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/schedule.service */ "./src/app/services/schedule.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_utilities_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/utilities.service */ "./src/app/services/utilities.service.ts");
/* harmony import */ var src_app_services_team_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/team.service */ "./src/app/services/team.service.ts");
/* harmony import */ var src_app_services_standings_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/standings.service */ "./src/app/services/standings.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var TeamScheduleComponent = /** @class */ (function () {
    function TeamScheduleComponent(Auth, route, router, scheduleService, util, team, standingsService) {
        this.Auth = Auth;
        this.route = route;
        this.router = router;
        this.scheduleService = scheduleService;
        this.util = util;
        this.team = team;
        this.standingsService = standingsService;
        //get the ID from the route
        if (this.route.snapshot.params['id']) {
            this.recTeam = this.route.snapshot.params['id'];
        }
    }
    TeamScheduleComponent.prototype.scheduleMatch = function (id) {
        this.router.navigate(['schedule/scheduleMatch', id]);
    };
    TeamScheduleComponent.prototype.checkDate = function (match) {
        var ret = false;
        if (match['scheduleDeadline']) {
            var intDate = parseInt(match['scheduleDeadline']);
            if (this.todayDate > intDate) {
                ret = true;
            }
        }
        return ret;
    };
    TeamScheduleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.todayDate = new Date().getTime();
        //get the team from the route, if it that is not present get it from the auth service
        var getTeam;
        if (this.recTeam) {
            getTeam = this.recTeam;
        }
        else {
            getTeam = this.Auth.getTeam();
        }
        //TODO: remove hard coded season 6!!!
        this.scheduleService.getTeamSchedules(6, getTeam).subscribe(function (res) {
            var matches = res;
            //set the nomatches state
            if (matches.length == 0) {
                _this.noMatches = true;
            }
            else {
                _this.noMatches = false;
            }
            var div = matches[0].divisionConcat;
            _this.standingsService.getStandings(div).subscribe(function (res) {
                var standings = res;
                matches.forEach(function (match) {
                    standings.forEach(function (standing) {
                        if (match.home.teamName == standing.teamName) {
                            match.home['losses'] = standing.losses;
                            match.home['wins'] = standing.wins;
                        }
                        if (match.away.teamName == standing.teamName) {
                            match.away['losses'] = standing.losses;
                            match.away['wins'] = standing.wins;
                        }
                    });
                    if (match.scheduleDeadline) {
                        match['friendlyDeadline'] = _this.util.getDateFromMS(match.scheduleDeadline);
                        console.log('yyy ', _this.util.getDateFromMS(match.scheduleDeadline));
                    }
                    if (match.scheduledTime) {
                        match['friendlyDate'] = _this.util.getDateFromMS(match.scheduledTime.startTime);
                        match['friendlyTime'] = _this.util.getTimeFromMS(match.scheduledTime.startTime);
                        match['suffix'] = _this.util.getSuffixFromMS(match.scheduledTime.startTime);
                    }
                });
            }, function (err) {
                console.log(err);
            });
            //build out the rounds object:
            /*
            rounds = {
              'roundNubmer':[
                              {matchObject},
                              {matchObject}
                            ]
                          }
            */
            console.log(matches);
            var _loop_1 = function () {
                if (_this.rounds == null || _this.rounds == undefined) {
                    _this.rounds = {};
                }
                var realRoundNumber = i + 1;
                matches.forEach(function (match) {
                    if (_this.rounds[realRoundNumber.toString()] == null || _this.rounds[realRoundNumber.toString()] == undefined) {
                        _this.rounds[realRoundNumber.toString()] = [];
                    }
                    if (match.round == realRoundNumber) {
                        _this.rounds[realRoundNumber.toString()].push(match);
                    }
                });
            };
            for (var i = 0; i <= matches.length; i++) {
                _loop_1();
            }
            console.log('rounds ', _this.rounds);
            _this.rounds;
        }, function (err) { console.log(err); });
    };
    //returns true if there is a scheduled time, and displays the scheduled time
    //returns false if there is not a scheduled time and displays the link to scheduling component
    TeamScheduleComponent.prototype.showSchedule = function (match) {
        if (this.util.returnBoolByPath(match, 'scheduledTime.priorScheduled')) {
            return true;
        }
        else {
            return false;
        }
    };
    //hides rows if the team has a bye week, no need for scheduling
    TeamScheduleComponent.prototype.byeWeekHide = function (match) {
        //if this is a bye week don't show
        if (!this.util.returnBoolByPath(match, 'away.teamName') || !this.util.returnBoolByPath(match, 'home.teamName')) {
            return true;
        }
        else {
            return false;
        }
    };
    //TODO: seen this code or similiar a few times, can we refactor?
    TeamScheduleComponent.prototype.displayTime = function (ms) {
        var d = new Date(parseInt(ms));
        var day = d.getDate();
        var year = d.getFullYear();
        var month = d.getMonth();
        month = month + 1;
        var hours = d.getHours();
        var suffix = "AM";
        if (hours > 12) {
            hours = hours - 12;
            suffix = "PM";
        }
        var min = d.getMinutes();
        var minStr;
        if (min == 0) {
            minStr = '00';
        }
        else {
            minStr = min.toString();
        }
        var dateTime = month + '/' + day + '/' + year + ' @ ' + hours + ':' + minStr + " " + suffix;
        return dateTime;
    };
    TeamScheduleComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-team-schedule',
            template: __webpack_require__(/*! ./team-schedule.component.html */ "./src/app/schedule/team-schedule/team-schedule.component.html"),
            styles: [__webpack_require__(/*! ./team-schedule.component.css */ "./src/app/schedule/team-schedule/team-schedule.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], src_app_services_schedule_service__WEBPACK_IMPORTED_MODULE_2__["ScheduleService"], src_app_services_utilities_service__WEBPACK_IMPORTED_MODULE_4__["UtilitiesService"], src_app_services_team_service__WEBPACK_IMPORTED_MODULE_5__["TeamService"], src_app_services_standings_service__WEBPACK_IMPORTED_MODULE_6__["StandingsService"]])
    ], TeamScheduleComponent);
    return TeamScheduleComponent;
}());



/***/ }),

/***/ "./src/app/services/admin.service.ts":
/*!*******************************************!*\
  !*** ./src/app/services/admin.service.ts ***!
  \*******************************************/
/*! exports provided: AdminService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminService", function() { return AdminService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _http_service_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./http-service.service */ "./src/app/services/http-service.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AdminService = /** @class */ (function () {
    function AdminService(httpService) {
        this.httpService = httpService;
    }
    //returns a list of all teams
    AdminService.prototype.getTeams = function () {
        var url = 'admin/get/teams/all';
        return this.httpService.httpGet(url, []);
    };
    //returns a list of teams not assigned to division
    AdminService.prototype.getTeamsNotDivisioned = function () {
        var url = 'admin/getTeamsUndivisioned';
        return this.httpService.httpGet(url, []);
    };
    //admin function to remove memvers from team accepts team name and name of user to remove
    //member can be an array of strings or string
    AdminService.prototype.removeMembers = function (team, member) {
        var url = 'admin/team/removeMember';
        var payload = {
            teamName: team,
            removeUser: member
        };
        return this.httpService.httpPost(url, payload, true);
    };
    //refreshes specified teams MMR
    AdminService.prototype.refreshTeamMMR = function (team) {
        var url = 'admin/team/refreshMmr';
        var payload = {
            teamName: team
        };
        return this.httpService.httpPost(url, payload, true);
    };
    //edits division, accepts the division object and division name: divisionConcat
    AdminService.prototype.saveDivisionEdits = function (divname, divobj) {
        var url = "admin/upsertDivision";
        var payload = {
            "divObj": divobj,
            "divName": divname
        };
        return this.httpService.httpPost(url, payload, true);
    };
    //calculates the teams MMR based on the provided usersMmr and the team's name
    AdminService.prototype.resultantMmr = function (userMmr, teamName) {
        var url = '/admin/resultantmmr';
        var payload = {
            userMmr: userMmr,
            teamName: teamName
        };
        return this.httpService.httpPost(url, payload, true);
    };
    //moves teams provided into the division provided
    //divisionConcat, array of team names as string
    AdminService.prototype.divisionTeam = function (teamArr, divisionName) {
        var url = "admin/divisionTeams";
        var payload = {
            teamInfo: teamArr,
            divisionName: divisionName
        };
        return this.httpService.httpPost(url, payload, true);
    };
    //removes teams provided from the division provided
    //divisionConcat, array of string names to remove
    AdminService.prototype.removeTeams = function (teamArr, divName) {
        var url = 'admin/removeTeams';
        var payload = {
            "teams": teamArr,
            "divName": divName
        };
        return this.httpService.httpPost(url, payload, true);
    };
    //returns list of all divisions
    AdminService.prototype.getDivisionList = function () {
        var url = 'admin/getDivisionInfo';
        return this.httpService.httpGet(url, []).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (res) {
            var divisionArr = res;
            divisionArr.sort(function (a, b) {
                if (a.sorting < b.sorting) {
                    return -1;
                }
                if (a.sorting > b.sorting) {
                    return 1;
                }
                return 0;
            });
            return divisionArr;
        }));
    };
    //returns to the pending member queue the admins approval or declining of a team member add
    AdminService.prototype.queuePost = function (teamName, memberName, action) {
        var url = 'admin/approveMemberAdd';
        var payload = {
            teamName: teamName,
            member: memberName,
            approved: action
        };
        return this.httpService.httpPost(url, payload, true);
    };
    //deletes user from provided username
    AdminService.prototype.deleteUser = function (user) {
        var url = 'admin/delete/user';
        var payload = { displayName: user };
        return this.httpService.httpPost(url, payload, true);
    };
    //deletes provided team by teamName
    AdminService.prototype.deleteTeam = function (team) {
        var url = 'admin/delete/team';
        team = team.toLowerCase();
        var payload = { teamName: team };
        return this.httpService.httpPost(url, payload, true);
    };
    //saves team name with provided teamName, and team Object
    AdminService.prototype.saveTeam = function (teamName, teamObj) {
        var url = 'admin/teamSave';
        var payload = {
            "teamName": teamName.toLowerCase(),
            "teamObj": teamObj
        };
        return this.httpService.httpPost(url, payload, true);
    };
    //changes captain of provided string to provided user
    AdminService.prototype.changeCaptain = function (team, user) {
        var url = 'admin/reassignCaptain';
        var payload = { teamName: team, userName: user };
        return this.httpService.httpPost(url, payload, true);
    };
    //creates division from provided division object
    AdminService.prototype.createDivision = function (divObj) {
        var url = 'admin/createDivision';
        var payload = { division: divObj };
        return this.httpService.httpPost(url, payload, true);
    };
    //deletes division from provided division name divisionConcat
    AdminService.prototype.deleteDivision = function (div) {
        var url = 'admin/deleteDivision';
        var payload = { division: div };
        return this.httpService.httpPost(url, payload, true);
    };
    //posts updates made to match (accepts whole match object)
    AdminService.prototype.matchUpdate = function (match) {
        var url = 'admin/match/update';
        var payload = {
            match: match
        };
        return this.httpService.httpPost(url, payload, true);
    };
    AdminService.prototype.setScheduleDeadline = function (div, time, endWeek) {
        var url = 'admin/match/set/schedule/deadline';
        var payload = {
            division: div,
            date: time,
            endWeek: endWeek
        };
        return this.httpService.httpPost(url, payload, true);
    };
    //returns list of all users and the access level lists
    AdminService.prototype.getUsersAcls = function () {
        var url = 'admin/user/get/usersacl/all';
        return this.httpService.httpGet(url, []);
    };
    //returns specified user and access level list
    AdminService.prototype.getUserAcls = function (id) {
        var url = 'admin/user/get/usersacl';
        var payload = {
            id: id
        };
        return this.httpService.httpPost(url, payload);
    };
    //updates user ACL lists, accpets entire admin object
    AdminService.prototype.upsertUserAcls = function (userACL) {
        var url = 'admin/user/upsertRoles';
        return this.httpService.httpPost(url, userACL, true);
    };
    AdminService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_http_service_service__WEBPACK_IMPORTED_MODULE_2__["HttpServiceService"]])
    ], AdminService);
    return AdminService;
}());



/***/ }),

/***/ "./src/app/services/auth-guard.service.ts":
/*!************************************************!*\
  !*** ./src/app/services/auth-guard.service.ts ***!
  \************************************************/
/*! exports provided: AuthGuardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuardService", function() { return AuthGuardService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth.service */ "./src/app/services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuardService = /** @class */ (function () {
    function AuthGuardService(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    AuthGuardService.prototype.canActivate = function (next, state) {
        if (next.data.role == 'caster') {
            if (this.auth.getCaster()) {
                return true;
            }
        }
        else if (next.data.role == undefined || next.data.role == null) {
            if (this.auth.getAdmin()) {
                return true;
            }
        }
        else if (this.auth.getAdmin().indexOf(next.data.role) > -1) {
            return true;
        }
        // navigate to login page
        this.router.navigate(['/noAccess/', next.data.role]);
        // you can save redirect url so after authing we can move them back to the page they requested
        return false;
    };
    AuthGuardService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], AuthGuardService);
    return AuthGuardService;
}());



/***/ }),

/***/ "./src/app/services/auth.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/auth.service.ts ***!
  \******************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @auth0/angular-jwt */ "./node_modules/@auth0/angular-jwt/index.js");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utilities.service */ "./src/app/services/utilities.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AuthService = /** @class */ (function () {
    function AuthService(router, http, util) {
        this.router = router;
        this.http = http;
        this.util = util;
        this.helper = new _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_3__["JwtHelperService"]();
    }
    AuthService.prototype.isAuthenticated = function () {
        var test = localStorage.getItem('token');
        if (test != null && test != undefined && test != '') {
            return true;
        }
        else {
            return false;
        }
    };
    AuthService.prototype.setReferral = function (token) {
        localStorage.setItem('referral', token);
    };
    AuthService.prototype.getReferral = function () {
        return localStorage.getItem('referral');
    };
    AuthService.prototype.destroyReferral = function () {
        localStorage.removeItem('referral');
    };
    //auth initializater
    AuthService.prototype.createAuth = function (token) {
        var decodedToken = this.helper.decodeToken(token);
        // console.log(decodedToken);
        localStorage.setItem('token', token);
        localStorage.setItem('userName', decodedToken.displayName);
        if (decodedToken.teamInfo) {
            if (this.util.returnBoolByPath(decodedToken, 'teamInfo.teamName')) {
                localStorage.setItem('teamName', decodedToken.teamInfo.teamName);
            }
            if (this.util.returnBoolByPath(decodedToken, 'teamInfo.isCaptain')) {
                localStorage.setItem('captain', decodedToken.teamInfo.isCaptain.toString());
            }
            else {
                localStorage.setItem('captain', 'false');
            }
        }
        //TODO: do something with the new admin bits passed to local
        if (decodedToken.adminLevel) {
            var adminString_1 = '';
            decodedToken.adminLevel.forEach(function (element) {
                var keys = Object.keys(element);
                if (keys.length > 0) {
                    if (keys[0] != 'CASTER') {
                        adminString_1 += keys[0].toLowerCase();
                    }
                    else {
                        localStorage.setItem('caster', 'true');
                    }
                }
            });
            if (adminString_1.length > 0) {
                localStorage.setItem('admin', adminString_1);
            }
        }
    };
    //caster methods
    AuthService.prototype.setCaster = function (caster) {
        localStorage.setItem('caster', caster);
    };
    AuthService.prototype.getCaster = function () {
        return localStorage.getItem('caster');
    };
    AuthService.prototype.destroyCaster = function () {
        localStorage.removeItem('caster');
    };
    //captain methods:
    AuthService.prototype.setCaptain = function (cap) {
        localStorage.setItem('captain', cap);
    };
    AuthService.prototype.getCaptain = function () {
        return localStorage.getItem('captain');
    };
    AuthService.prototype.destroyCaptain = function () {
        localStorage.removeItem('captain');
    };
    //token methods:
    AuthService.prototype.setToken = function (token) {
        localStorage.setItem('token', token);
    };
    AuthService.prototype.getToken = function () {
        return localStorage.getItem('token');
    };
    AuthService.prototype.destroyToken = function () {
        localStorage.removeItem('token');
    };
    //user methods:
    AuthService.prototype.setUser = function (user) {
        localStorage.setItem('userName', user);
    };
    AuthService.prototype.getUser = function () {
        return localStorage.getItem('userName');
    };
    AuthService.prototype.destroyUser = function () {
        localStorage.removeItem('userName');
    };
    //admin methods
    AuthService.prototype.setAdmin = function (admin) {
        localStorage.setItem('admin', admin.toLowerCase());
    };
    AuthService.prototype.getAdmin = function () {
        return localStorage.getItem('admin');
    };
    AuthService.prototype.destroyAdmin = function () {
        localStorage.removeItem('admin');
    };
    AuthService.prototype.checkAdminLevel = function (level) {
        var admin = localStorage.getItem('admin');
        return !!admin.indexOf(level.toLowerCase());
    };
    //team methods:
    AuthService.prototype.setTeam = function (teamName) {
        localStorage.setItem('teamName', teamName);
    };
    AuthService.prototype.getTeam = function () {
        return localStorage.getItem('teamName');
    };
    AuthService.prototype.destroyTeam = function () {
        localStorage.removeItem('teamName');
    };
    //destroy all auth
    AuthService.prototype.destroyAuth = function (route) {
        var _this = this;
        // let url = 'http://localhost:3000/auth/logout';
        var url = '/auth/logout';
        this.http.get(url).subscribe(function (res) {
            localStorage.removeItem('userName');
            localStorage.removeItem('token');
            localStorage.removeItem('teamName');
            localStorage.removeItem('captain');
            _this.destroyAdmin();
            _this.destroyCaster();
            _this.router.navigate([route]);
        });
    };
    AuthService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({ providedIn: 'root' }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _utilities_service__WEBPACK_IMPORTED_MODULE_4__["UtilitiesService"]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "./src/app/services/contentful.service.ts":
/*!************************************************!*\
  !*** ./src/app/services/contentful.service.ts ***!
  \************************************************/
/*! exports provided: ContentfulService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentfulService", function() { return ContentfulService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var contentful__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful */ "./node_modules/contentful/dist/es-modules/contentful.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



var ContentfulService = /** @class */ (function () {
    function ContentfulService() {
        this.client = Object(contentful__WEBPACK_IMPORTED_MODULE_1__["createClient"])({
            space: _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].contentful.spaceID,
            accessToken: _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].contentful.token
        });
        this.localCategories = [];
    }
    ContentfulService.prototype.getCategories = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.client.getEntries((Object.assign({ content_type: 'category' })))];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.items];
                    case 2:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ContentfulService.prototype.getBlogs = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.client.getEntries((Object.assign({ content_type: 'blogPost' }, query)))];
                    case 1:
                        res = _a.sent();
                        this.clearCache();
                        return [2 /*return*/, res.items];
                    case 2:
                        err_2 = _a.sent();
                        return [2 /*return*/, err_2];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ContentfulService.prototype.getBlog = function (blog) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.getEntry(blog)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    //store this blog in the local service so we don't have to HTTP request it again
    ContentfulService.prototype.cacheBlog = function (blog) {
        this.tempBlog = blog;
    };
    ContentfulService.prototype.clearCache = function () {
        this.tempBlog = {};
    };
    ContentfulService.prototype.getCache = function () {
        if (this.tempBlog == undefined || this.tempBlog == null) {
            return null;
        }
        var prop = Object.keys(this.tempBlog);
        if (prop.length == 0) {
            return null;
        }
        else {
            return this.tempBlog;
        }
    };
    ContentfulService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], ContentfulService);
    return ContentfulService;
}());



/***/ }),

/***/ "./src/app/services/division.service.ts":
/*!**********************************************!*\
  !*** ./src/app/services/division.service.ts ***!
  \**********************************************/
/*! exports provided: DivisionService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DivisionService", function() { return DivisionService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _http_service_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./http-service.service */ "./src/app/services/http-service.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DivisionService = /** @class */ (function () {
    function DivisionService(httpService) {
        this.httpService = httpService;
    }
    //returns and sorts all divisions
    DivisionService.prototype.getDivisionInfo = function () {
        var turl = '/admin/getDivisionInfo';
        return this.httpService.httpGet(turl, []).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (res) {
            var divisionArr = res;
            divisionArr.sort(function (a, b) {
                if (a.sorting < b.sorting) {
                    return -1;
                }
                if (a.sorting > b.sorting) {
                    return 1;
                }
                return 0;
            });
            return divisionArr;
        }));
    };
    //returns division information of provided division; divisionConcat
    DivisionService.prototype.getDivision = function (divisionName) {
        var url = '/division/get';
        var parameters = [{ 'division': divisionName }];
        return this.httpService.httpGet(url, parameters);
    };
    DivisionService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_http_service_service__WEBPACK_IMPORTED_MODULE_2__["HttpServiceService"]])
    ], DivisionService);
    return DivisionService;
}());

// getDivInfo(divisionName:string){
//   let url = 'admin/getDivInfo'
//   return this.http.get<any>(url + '?division=' + divisionName).pipe(
//     map((res) => {
//       return res.returnObject;
//     })); 
// }


/***/ }),

/***/ "./src/app/services/hots-logs.service.ts":
/*!***********************************************!*\
  !*** ./src/app/services/hots-logs.service.ts ***!
  \***********************************************/
/*! exports provided: HotsLogsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HotsLogsService", function() { return HotsLogsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HotsLogsService = /** @class */ (function () {
    function HotsLogsService(http) {
        this.http = http;
        this.url = 'https://api.hotslogs.com/Public/Players/?id';
    }
    HotsLogsService.prototype.getMMR = function (playerId) {
        if (playerId.indexOf('https://www.hotslogs.com/Player/Profile?PlayerID=') > -1) {
            playerId = playerId.slice(playerId.indexOf("=") + 1, playerId.length);
        }
        var callUrl = this.url.replace('?id', playerId);
        return this.http.get(callUrl).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) {
            if (res.hasOwnProperty('LeaderboardRankings')) {
                var inc = 0;
                var totalMMR = 0;
                res['LeaderboardRankings'].forEach(function (element) {
                    if (element['GameMode'] != 'QuickMatch') {
                        if (element['CurrentMMR'] > 0) {
                            inc += 1;
                            totalMMR += element.CurrentMMR;
                        }
                    }
                });
                return Math.round(totalMMR / inc);
            }
            else {
                if (res.hasOwnProperty('Message')) {
                    if (res['Message'].indexOf('invalid') > -1) {
                        return 'error';
                    }
                }
            }
        }));
    };
    HotsLogsService.prototype.validCheck = function (url) {
        var playerId = '';
        if (url.indexOf('https://www.hotslogs.com/Player/Profile?PlayerID=') > -1) {
            playerId = url.slice(url.indexOf("=") + 1, url.length);
        }
        var callUrl = this.url.replace('?id', playerId);
        return this.http.get(callUrl);
    };
    HotsLogsService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], HotsLogsService);
    return HotsLogsService;
}());



/***/ }),

/***/ "./src/app/services/http-service.service.ts":
/*!**************************************************!*\
  !*** ./src/app/services/http-service.service.ts ***!
  \**************************************************/
/*! exports provided: HttpServiceService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpServiceService", function() { return HttpServiceService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _notification_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./notification.service */ "./src/app/services/notification.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HttpServiceService = /** @class */ (function () {
    function HttpServiceService(http, notificationService) {
        this.http = http;
        this.notificationService = notificationService;
    }
    HttpServiceService.prototype.httpPost = function (url, payload, showNotification) {
        var _this = this;
        if (showNotification) {
            this.notificationService.subj_notification.next('Working..');
        }
        return this.http.post(url, payload).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) {
            if (showNotification) {
                _this.notificationService.subj_notification.next(res['message']);
            }
            return res['returnObject'];
        }, function (err) {
            console.log('httpPostService ', err);
        }));
    };
    ;
    HttpServiceService.prototype.httpGet = function (url, parameters, showNotification) {
        var _this = this;
        /*
        [{parameter:query}]
        */
        parameters.forEach(function (element, index) {
            var key = Object.keys(element);
            if (index == 0) {
                url += '?' + key[0] + '=' + element[key[0]];
            }
            else {
                url += '&' + key[0] + '=' + element[key[0]];
            }
        });
        if (showNotification) {
            this.notificationService.subj_notification.next('Working..');
        }
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) {
            if (showNotification) {
                _this.notificationService.subj_notification.next(res['message']);
            }
            return res['returnObject'];
        }, function (err) {
            console.log('httpGetService ', err);
        }));
    };
    HttpServiceService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], _notification_service__WEBPACK_IMPORTED_MODULE_3__["NotificationService"]])
    ], HttpServiceService);
    return HttpServiceService;
}());



/***/ }),

/***/ "./src/app/services/markdown-parser.service.ts":
/*!*****************************************************!*\
  !*** ./src/app/services/markdown-parser.service.ts ***!
  \*****************************************************/
/*! exports provided: MarkdownParserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarkdownParserService", function() { return MarkdownParserService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var marked__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! marked */ "./node_modules/marked/lib/marked.js");
/* harmony import */ var marked__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(marked__WEBPACK_IMPORTED_MODULE_1__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MarkdownParserService = /** @class */ (function () {
    function MarkdownParserService() {
        this.md = marked__WEBPACK_IMPORTED_MODULE_1__;
    }
    //this is used to parse the contentful returns as they are returned with markdown
    MarkdownParserService.prototype.convertMarkdown = function (markdown) {
        return this.md.parse(markdown);
    };
    MarkdownParserService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], MarkdownParserService);
    return MarkdownParserService;
}());



/***/ }),

/***/ "./src/app/services/notification.service.ts":
/*!**************************************************!*\
  !*** ./src/app/services/notification.service.ts ***!
  \**************************************************/
/*! exports provided: NotificationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationService", function() { return NotificationService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NotificationService = /** @class */ (function () {
    function NotificationService() {
        this.subj_notification = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    }
    NotificationService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], NotificationService);
    return NotificationService;
}());



/***/ }),

/***/ "./src/app/services/queues.service.ts":
/*!********************************************!*\
  !*** ./src/app/services/queues.service.ts ***!
  \********************************************/
/*! exports provided: QueuesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueuesService", function() { return QueuesService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _http_service_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./http-service.service */ "./src/app/services/http-service.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var QueuesService = /** @class */ (function () {
    function QueuesService(httpService) {
        this.httpService = httpService;
    }
    QueuesService.prototype.getQueues = function (queue) {
        var url = 'admin/';
        url += queue;
        return this.httpService.httpGet(url, []);
    };
    QueuesService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_http_service_service__WEBPACK_IMPORTED_MODULE_1__["HttpServiceService"]])
    ], QueuesService);
    return QueuesService;
}());



/***/ }),

/***/ "./src/app/services/schedule.service.ts":
/*!**********************************************!*\
  !*** ./src/app/services/schedule.service.ts ***!
  \**********************************************/
/*! exports provided: ScheduleService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScheduleService", function() { return ScheduleService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _http_service_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./http-service.service */ "./src/app/services/http-service.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ScheduleService = /** @class */ (function () {
    function ScheduleService(httpService) {
        this.httpService = httpService;
    }
    //returns all generated matches
    ScheduleService.prototype.getAllMatches = function () {
        var url = 'schedule/get/matches/all';
        var payload = {};
        return this.httpService.httpPost(url, payload);
    };
    //schedule/get/matches/scheduled
    ScheduleService.prototype.getAllMatchesWithStartTime = function () {
        var url = 'schedule/get/matches/scheduled';
        return this.httpService.httpGet(url, []);
    };
    //returns matches that match criteria of season, division
    ScheduleService.prototype.getDivisionScheduleMatches = function (season, division) {
        var url = 'schedule/get/division/matches';
        var payload = {
            'season': season,
            'division': division
        };
        return this.httpService.httpPost(url, payload);
    };
    ;
    //returns matches that match criteria of season, division, round
    ScheduleService.prototype.getScheduleMatches = function (season, division, round) {
        var url = 'schedule/get/matches';
        var payload = {
            'season': season,
            'division': division,
            'round': round
        };
        return this.httpService.httpPost(url, payload);
    };
    ;
    //returns matches that match criteria of provided season and team
    ScheduleService.prototype.getTeamSchedules = function (season, team) {
        var url = 'schedule/get/matches/team';
        team = team.toLowerCase();
        var payload = {
            'season': season,
            'team': team
        };
        return this.httpService.httpPost(url, payload);
    };
    //returns a match given the matchId and season
    ScheduleService.prototype.getMatchInfo = function (season, matchId) {
        var url = 'schedule/get/match';
        var payload = {
            "season": season,
            "matchId": matchId
        };
        return this.httpService.httpPost(url, payload);
    };
    //accepts match id and two dates, schedules the provided match stard, and end times
    ScheduleService.prototype.scheduleMatchTime = function (matchId, scheduledStartTime, scheduledEndTime) {
        // let url = 'http://localhost:3000/schedule/setMatchTime';
        var url = 'schedule/update/match/time';
        var payload = {
            "matchId": matchId,
            "scheduledStartTime": scheduledStartTime,
            "scheduledEndTime": scheduledEndTime
        };
        return this.httpService.httpPost(url, payload, true);
    };
    //accepts an object that contains elements for reporting the match outcome:
    /*
      {
        replay1:File,
        replay2:File,
        awayScore:number,
        homeScore:number,
        matchId:string
      }
    */
    ScheduleService.prototype.reportMatch = function (payload) {
        var url = 'schedule/report/match';
        var input = new FormData();
        var keys = Object.keys(payload);
        keys.forEach(function (element) {
            input.append(element, payload[element]);
        });
        return this.httpService.httpPost(url, input, true);
    };
    // /match/add / caster
    ScheduleService.prototype.addCaster = function (matchId, casterName, casterUrl) {
        var payload = {
            matchId: matchId,
            casterName: casterName,
            casterUrl: casterUrl
        };
        var url = 'schedule/match/add/caster';
        return this.httpService.httpPost(url, payload, true);
    };
    ScheduleService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_http_service_service__WEBPACK_IMPORTED_MODULE_1__["HttpServiceService"]])
    ], ScheduleService);
    return ScheduleService;
}());



/***/ }),

/***/ "./src/app/services/standings.service.ts":
/*!***********************************************!*\
  !*** ./src/app/services/standings.service.ts ***!
  \***********************************************/
/*! exports provided: StandingsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StandingsService", function() { return StandingsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _http_service_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./http-service.service */ "./src/app/services/http-service.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var StandingsService = /** @class */ (function () {
    function StandingsService(httpService) {
        this.httpService = httpService;
    }
    //accepts the divisionConcat and returns the standings of the division based on reported matches
    StandingsService.prototype.getStandings = function (div) {
        var url = 'standings/get/division';
        var payload = {
            division: div
        };
        return this.httpService.httpPost(url, payload);
    };
    StandingsService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_http_service_service__WEBPACK_IMPORTED_MODULE_1__["HttpServiceService"]])
    ], StandingsService);
    return StandingsService;
}());



/***/ }),

/***/ "./src/app/services/team.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/team.service.ts ***!
  \******************************************/
/*! exports provided: TeamService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeamService", function() { return TeamService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _http_service_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./http-service.service */ "./src/app/services/http-service.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TeamService = /** @class */ (function () {
    function TeamService(httpService) {
        this.httpService = httpService;
    }
    //returns sys data
    TeamService.prototype.getSysData = function (name) {
        var url = 'team/get/sys/dat';
        var payload = { 'data': name };
        return this.httpService.httpPost(url, payload);
    };
    //returns requested team
    TeamService.prototype.getTeam = function (name) {
        var encodededID = encodeURIComponent(this.realTeamName(name));
        var url = 'team/get';
        var params = [{ team: encodededID }];
        return this.httpService.httpGet(url, params);
    };
    ;
    //retuns teams from an array of team names
    TeamService.prototype.getTeams = function (names) {
        var url = 'team/getTeams';
        var payload = { teams: names };
        return this.httpService.httpPost(url, payload);
    };
    //changes the teams captain to passed user
    TeamService.prototype.changeCaptain = function (team, user) {
        var url = 'team/reassignCaptain';
        team = team.toLowerCase();
        var payload = {
            teamName: team,
            username: user
        };
        return this.httpService.httpPost(url, payload, true);
    };
    //deletes the passed team
    TeamService.prototype.deleteTeam = function (team) {
        var url = 'team/delete';
        team = team.toLowerCase();
        var payload = { teamName: team };
        return this.httpService.httpPost(url, payload, true);
    };
    //searches team via provided string
    TeamService.prototype.teamSearch = function (team) {
        var url = 'search/team';
        team = team.toLowerCase();
        var payload = { teamName: team };
        return this.httpService.httpPost(url, payload);
    };
    //create team
    TeamService.prototype.createTeam = function (team) {
        var url = 'team/create';
        return this.httpService.httpPost(url, team, true);
    };
    //saves any changes to team info
    TeamService.prototype.saveTeam = function (team) {
        var url = 'team/save';
        return this.httpService.httpPost(url, team, true);
    };
    //saves team questionnaire
    TeamService.prototype.saveTeamQuestionnaire = function (team, questionnaire) {
        var url = '/team/questionnaire/save';
        var payload = {
            teamName: team,
            questionnaire: questionnaire
        };
        return this.httpService.httpPost(url, payload, true);
    };
    //removes user from team members list
    TeamService.prototype.removeUser = function (user, team) {
        var url = '/team/removeMember';
        var payload = {
            remove: user,
            teamName: team
        };
        return this.httpService.httpPost(url, payload, true);
    };
    //adds user to perscribed team
    TeamService.prototype.addUser = function (user, team) {
        var postData = {};
        if (typeof user != 'object') {
            postData['teamName'] = team;
            postData['addMember'] = user;
        }
        else {
            postData = user;
        }
        var url = 'team/addMember';
        return this.httpService.httpPost(url, postData, true);
    };
    TeamService.prototype.logoUpload = function (imgInput) {
        var url = 'team/uploadLogo';
        return this.httpService.httpPost(url, imgInput, true);
    };
    //retuns a formatted string that includes the requisite info to retrieve an image from s3 bucket
    TeamService.prototype.imageFQDN = function (img) {
        var imgFQDN = 'https://s3.amazonaws.com/' + _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].s3bucketImages + '/';
        if (img) {
            imgFQDN += img;
        }
        else {
            imgFQDN += 'defaultTeamLogo.png';
        }
        return imgFQDN;
    };
    //returns a route friendly URL name for a team, removing any spaces
    TeamService.prototype.routeFriendlyTeamName = function (teamname) {
        var pattern = ' ';
        var re = new RegExp(pattern, "g");
        if (teamname != null && teamname != undefined) {
            return teamname.replace(re, '_');
        }
        else {
            return '';
        }
    };
    //returns team name re formatted with spaces
    TeamService.prototype.realTeamName = function (teamname) {
        var pattern = '_';
        var re = new RegExp(pattern, "g");
        if (teamname != null && teamname != undefined) {
            return teamname.replace(re, ' ');
        }
        else {
            return '';
        }
    };
    TeamService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_http_service_service__WEBPACK_IMPORTED_MODULE_2__["HttpServiceService"]])
    ], TeamService);
    return TeamService;
}());



/***/ }),

/***/ "./src/app/services/timezone.service.ts":
/*!**********************************************!*\
  !*** ./src/app/services/timezone.service.ts ***!
  \**********************************************/
/*! exports provided: TimezoneService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimezoneService", function() { return TimezoneService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TimezoneService = /** @class */ (function () {
    function TimezoneService() {
        this.timezones = [
            {
                "value": "-12",
                "text": "(GMT -12:00) Eniwetok, Kwajalein"
            },
            {
                "value": "-11",
                "text": "(GMT -11:00) Midway Island, Samoa"
            },
            {
                "value": "-10",
                "text": "(GMT -10:00) Hawaii"
            },
            {
                "value": "-9",
                "text": "(GMT -9:00) Alaska"
            },
            {
                "value": "-8",
                "text": "(GMT -8:00) Pacific Time (US & Canada)"
            },
            {
                "value": "-7",
                "text": "(GMT -7:00) Mountain Time (US & Canada)"
            },
            {
                "value": "-6",
                "text": "(GMT -6:00) Central Time (US & Canada), Mexico City"
            },
            {
                "value": "-5",
                "text": "(GMT -5:00) Eastern Time (US & Canada), Bogota, Lima"
            },
            {
                "value": "-4",
                "text": "(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz"
            },
            {
                "value": "-3.5",
                "text": "(GMT -3:30) Newfoundland"
            },
            {
                "value": "-3",
                "text": "(GMT -3:00) Brazil, Buenos Aires, Georgetown"
            },
            {
                "value": "-2",
                "text": "(GMT -2:00) Mid-Atlantic"
            },
            {
                "value": "-1",
                "text": "(GMT -1:00) Azores, Cape Verde Islands"
            },
            {
                "value": "0",
                "text": "(GMT) Western Europe Time, London, Lisbon, Casablanca"
            },
            {
                "value": "1",
                "text": "(GMT +1:00) Brussels, Copenhagen, Madrid, Paris"
            },
            {
                "value": "2",
                "text": "(GMT +2:00) Kaliningrad, South Africa"
            },
            {
                "value": "3",
                "text": "(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg"
            },
            {
                "value": "3.5",
                "text": "(GMT +3:30) Tehran"
            },
            {
                "value": "4",
                "text": "(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi"
            },
            {
                "value": "4.5",
                "text": "(GMT +4:30) Kabul"
            },
            {
                "value": "5",
                "text": "(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent"
            },
            {
                "value": "5.5",
                "text": "(GMT +5:30) Bombay, Calcutta, Madras, New Delhi"
            },
            {
                "value": "5.75",
                "text": "(GMT +5:45) Kathmandu"
            },
            {
                "value": "6",
                "text": "(GMT +6:00) Almaty, Dhaka, Colombo"
            },
            {
                "value": "7",
                "text": "(GMT +7:00) Bangkok, Hanoi, Jakarta"
            },
            {
                "value": "8",
                "text": "(GMT +8:00) Beijing, Perth, Singapore, Hong Kong"
            },
            {
                "value": "9",
                "text": "(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk"
            },
            {
                "value": "9.5",
                "text": "(GMT +9:30) Adelaide, Darwin"
            },
            {
                "value": "10",
                "text": "(GMT +10:00) Eastern Australia, Guam, Vladivostok"
            },
            {
                "value": "11",
                "text": "(GMT +11:00) Magadan, Solomon Islands, New Caledonia"
            },
            {
                "value": "12",
                "text": "(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka"
            }
        ];
    }
    TimezoneService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], TimezoneService);
    return TimezoneService;
}());



/***/ }),

/***/ "./src/app/services/token-interceptor.service.ts":
/*!*******************************************************!*\
  !*** ./src/app/services/token-interceptor.service.ts ***!
  \*******************************************************/
/*! exports provided: ResponseInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResponseInterceptor", function() { return ResponseInterceptor; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ResponseInterceptor = /** @class */ (function () {
    function ResponseInterceptor(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    ResponseInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        req = req.clone({ setHeaders: {
                Authorization: "Bearer " + this.auth.getToken()
            } });
        return next.handle(req).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(function (event) {
            if (event instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpResponse"]) {
                if (event.headers.get('Authorization') != null && event.headers.get('Authorization') != undefined) {
                    var token = event.headers.get('Authorization');
                    token = token.replace('Bearer ', '');
                    _this.auth.createAuth(token);
                }
            }
        }, function (err) {
            if (err.status == 401) {
                console.log('we have a 401 here!!!');
                _this.auth.destroyAuth('/sessionTimeOut');
                // this.router.navigateByUrl['/sessionTimeOut'];
            }
            else {
            }
        }));
    };
    ResponseInterceptor = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
        __metadata("design:paramtypes", [_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], ResponseInterceptor);
    return ResponseInterceptor;
}());



/***/ }),

/***/ "./src/app/services/user.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/user.service.ts ***!
  \******************************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _http_service_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./http-service.service */ "./src/app/services/http-service.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//methods for getting and calling user information
var UserService = /** @class */ (function () {
    function UserService(httpService) {
        this.httpService = httpService;
    }
    //gets the user profile to match
    UserService.prototype.getUser = function (id) {
        var encodedID = encodeURIComponent(id);
        var url = 'user/get';
        var params = [{ user: encodedID }];
        return this.httpService.httpGet(url, params);
    };
    //sends the information to the outreach route
    UserService.prototype.emailOutreach = function (email) {
        var url = '/outreach/invite';
        var payload = {
            userEmail: email
        };
        return this.httpService.httpPost(url, payload, true);
    };
    //searchs for users
    UserService.prototype.userSearch = function (id, type) {
        var allUrl = 'search/user';
        var unTeamedUrl = '/search/user/unteamed';
        var url;
        if (typeof id != 'object') {
            id = { 'userName': id };
        }
        if (type == undefined || type == null) {
            url = allUrl;
        }
        else if (type == 'unteamed') {
            url = unTeamedUrl;
        }
        else if (type == 'all') {
            url = allUrl;
        }
        return this.httpService.httpPost(url, id);
    };
    //saves user profile
    UserService.prototype.saveUser = function (user) {
        var url = "user/save";
        return this.httpService.httpPost(url, user, true);
    };
    //deletes the user
    UserService.prototype.deleteUser = function () {
        var url = "user/delete";
        return this.httpService.httpGet(url, [], true);
    };
    //captures and sends created user and the invite token they used when logging in;
    //this clears the pending outreach in queue
    UserService.prototype.outreachResponse = function (token, user) {
        var url = 'outreach/inviteResponseComplete';
        if (typeof token != 'object') {
            token = { "referral": token, "user": user };
        }
        return this.httpService.httpPost(url, token);
    };
    //replaces URL safe character # with _ for URLs for usernames
    UserService.prototype.routeFriendlyUsername = function (username) {
        if (username != null && username != undefined) {
            return username.replace('#', '_');
        }
        else {
            return '';
        }
    };
    //turns any user name that has been sanatised for URL back to the real user name
    UserService.prototype.realUserName = function (username) {
        if (username != null && username != undefined) {
            return username.replace('_', '#');
        }
        else {
            return '';
        }
    };
    UserService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({ providedIn: 'root' }),
        __metadata("design:paramtypes", [_http_service_service__WEBPACK_IMPORTED_MODULE_1__["HttpServiceService"]])
    ], UserService);
    return UserService;
}());



/***/ }),

/***/ "./src/app/services/utilities.service.ts":
/*!***********************************************!*\
  !*** ./src/app/services/utilities.service.ts ***!
  \***********************************************/
/*! exports provided: UtilitiesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UtilitiesService", function() { return UtilitiesService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UtilitiesService = /** @class */ (function () {
    function UtilitiesService() {
    }
    UtilitiesService.prototype.prePendHttp = function (link) {
        if (link.indexOf('http://www.') == -1 || link.indexOf('https://wwww.') == -1) {
            return 'http://www.' + link;
        }
        else {
            return link;
        }
    };
    UtilitiesService.prototype.getTimeFromMS = function (msDate) {
        var time = new Date(parseInt(msDate));
        // this.friendlyDate = time;
        // this.suffix = 'AM';
        var hours = time.getHours();
        if (hours > 12) {
            hours = hours - 12;
        }
        var min = time.getMinutes();
        var minStr;
        if (min == 0) {
            minStr = '00';
        }
        else {
            minStr = min.toString();
        }
        return hours + ":" + minStr;
    };
    UtilitiesService.prototype.dayOfWeekAsString = function (dayIndex) {
        return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayIndex];
    };
    UtilitiesService.prototype.getDatePickerFormatFromMS = function (msDate) {
        return new Date(parseInt(msDate));
    };
    UtilitiesService.prototype.getDateFromMS = function (msDate) {
        var time = new Date(parseInt(msDate));
        var year = time.getFullYear();
        var day = this.dayOfWeekAsString(time.getDay());
        var date = time.getDate();
        var month = time.getMonth() + 1;
        if (day == undefined || month == NaN || date == NaN || year == NaN) {
            console.log('???');
            return null;
        }
        else {
            return day + ' ' + month + '/' + date + '/' + year;
        }
    };
    UtilitiesService.prototype.getSuffixFromMS = function (msDate) {
        var suffix = 'AM';
        var time = new Date(parseInt(msDate));
        var hours = time.getHours();
        if (hours > 12) {
            hours = hours - 12;
            suffix = "PM";
        }
        return suffix;
    };
    UtilitiesService.prototype.markFormGroupTouched = function (formGroup) {
        if (formGroup.controls) {
            var keys = Object.keys(formGroup.controls);
            for (var i = 0; i < keys.length; i++) {
                var control = formGroup.controls[keys[i]];
                if (control instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]) {
                    control.markAsTouched();
                }
                else if (control instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]) {
                    this.markFormGroupTouched(control);
                }
            }
        }
    };
    UtilitiesService.prototype.returnBoolByPath = function (obj, path) {
        //path is a string representing a dot notation object path;
        //create an array of the string for easier manipulation
        var pathArr = path.split('.');
        //return value
        var retVal = null;
        //get the first element of the array for testing
        var ele = pathArr[0];
        //make sure the property exist on the object
        if (obj.hasOwnProperty(ele)) {
            if (typeof obj[ele] == 'boolean') {
                retVal = true;
            }
            //property exists:
            //property is an object, and the path is deeper, jump in!
            else if (typeof obj[ele] == 'object' && pathArr.length > 1) {
                //remove first element of array
                pathArr.splice(0, 1);
                //reconstruct the array back into a string, adding "." if there is more than 1 element
                if (pathArr.length > 1) {
                    path = pathArr.join('.');
                }
                else {
                    path = pathArr[0];
                }
                //recurse this function using the current place in the object, plus the rest of the path
                retVal = this.returnBoolByPath(obj[ele], path);
            }
            else if (typeof obj[ele] == 'object' && pathArr.length == 0) {
                retVal = obj[ele];
            }
            else {
                retVal = obj[ele];
            }
        }
        return !!retVal;
    };
    UtilitiesService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], UtilitiesService);
    return UtilitiesService;
}());



/***/ }),

/***/ "./src/app/session-timeout/session-timeout.component.css":
/*!***************************************************************!*\
  !*** ./src/app/session-timeout/session-timeout.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/session-timeout/session-timeout.component.html":
/*!****************************************************************!*\
  !*** ./src/app/session-timeout/session-timeout.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"containter forceFull\">\n    <div class=\"row\">\n        <div class=\"col text-center\">\n            <h3>Session time out</h3>\n            <h5>Your session has timed out. Please log back in!</h5>\n            <a class=\"btn btn-default\" [routerLink]=\"['/login']\">Login</a>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/session-timeout/session-timeout.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/session-timeout/session-timeout.component.ts ***!
  \**************************************************************/
/*! exports provided: SessionTimeoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SessionTimeoutComponent", function() { return SessionTimeoutComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SessionTimeoutComponent = /** @class */ (function () {
    function SessionTimeoutComponent() {
    }
    SessionTimeoutComponent.prototype.ngOnInit = function () {
    };
    SessionTimeoutComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-session-timeout',
            template: __webpack_require__(/*! ./session-timeout.component.html */ "./src/app/session-timeout/session-timeout.component.html"),
            styles: [__webpack_require__(/*! ./session-timeout.component.css */ "./src/app/session-timeout/session-timeout.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], SessionTimeoutComponent);
    return SessionTimeoutComponent;
}());



/***/ }),

/***/ "./src/app/snackbar/snackbar.component.css":
/*!*************************************************!*\
  !*** ./src/app/snackbar/snackbar.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/snackbar/snackbar.component.html":
/*!**************************************************!*\
  !*** ./src/app/snackbar/snackbar.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  snackbar works!\n</p>\n"

/***/ }),

/***/ "./src/app/snackbar/snackbar.component.ts":
/*!************************************************!*\
  !*** ./src/app/snackbar/snackbar.component.ts ***!
  \************************************************/
/*! exports provided: SnackbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SnackbarComponent", function() { return SnackbarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SnackbarComponent = /** @class */ (function () {
    function SnackbarComponent() {
    }
    SnackbarComponent.prototype.ngOnInit = function () {
    };
    SnackbarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-snackbar',
            template: __webpack_require__(/*! ./snackbar.component.html */ "./src/app/snackbar/snackbar.component.html"),
            styles: [__webpack_require__(/*! ./snackbar.component.css */ "./src/app/snackbar/snackbar.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], SnackbarComponent);
    return SnackbarComponent;
}());



/***/ }),

/***/ "./src/app/standings-view/standings-view.component.css":
/*!*************************************************************!*\
  !*** ./src/app/standings-view/standings-view.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/standings-view/standings-view.component.html":
/*!**************************************************************!*\
  !*** ./src/app/standings-view/standings-view.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <div class=\"row\">\n        <div class=\"col\">\n            <h3>Standings</h3>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col\">\n            Position\n        </div>\n        <div class=\"col\">\n            Team Name\n        </div>\n        <div class=\"col\">\n            Points\n        </div>\n        <div class=\"col\">\n            Dominations\n        </div>\n        <div class=\"col\">\n            Wins\n        </div>\n        <div class=\"col\">\n            Losses\n        </div>\n    </div>\n    <div *ngIf=\"standings.length>0 else noStandings\">\n        <div class=\"row\" *ngFor=\"let standing of standings\">\n            <div class=\"col\">\n                {{standing.standing}}\n            </div>\n            <div class=\"col\">\n                {{standing.teamName}}\n            </div>\n            <div class=\"col\">\n                {{standing.points}}\n            </div>\n            <div class=\"col\">\n                {{standing.dominations}}\n            </div>\n            <div class=\"col\">\n                {{standing.wins}}\n            </div>\n            <div class=\"col\">\n                {{standing.losses}}\n            </div>\n        </div>\n    </div>\n\n    <ng-template #noStandings>\n        <div class=\"row mt-3\">\n            <div class=\"col text-center\">\n                <h5>There are currently no matches generated to calculate standings!</h5>\n                <h6> Check back later! </h6>\n            </div>\n        </div>\n    </ng-template>\n</div>"

/***/ }),

/***/ "./src/app/standings-view/standings-view.component.ts":
/*!************************************************************!*\
  !*** ./src/app/standings-view/standings-view.component.ts ***!
  \************************************************************/
/*! exports provided: StandingsViewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StandingsViewComponent", function() { return StandingsViewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_standings_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/standings.service */ "./src/app/services/standings.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var StandingsViewComponent = /** @class */ (function () {
    function StandingsViewComponent(standingsService) {
        this.standingsService = standingsService;
        this.standings = [];
    }
    Object.defineProperty(StandingsViewComponent.prototype, "division", {
        set: function (div) {
            if (div != null && div != undefined) {
                this.div = div;
                this.getStandings(div.divisionConcat);
            }
        },
        enumerable: true,
        configurable: true
    });
    StandingsViewComponent.prototype.getStandings = function (div) {
        var _this = this;
        this.standingsService.getStandings(div).subscribe(function (res) {
            _this.standings = res;
        }, function (err) {
            console.log(err);
        });
    };
    StandingsViewComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], StandingsViewComponent.prototype, "division", null);
    StandingsViewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-standings-view',
            template: __webpack_require__(/*! ./standings-view.component.html */ "./src/app/standings-view/standings-view.component.html"),
            styles: [__webpack_require__(/*! ./standings-view.component.css */ "./src/app/standings-view/standings-view.component.css")]
        }),
        __metadata("design:paramtypes", [_services_standings_service__WEBPACK_IMPORTED_MODULE_1__["StandingsService"]])
    ], StandingsViewComponent);
    return StandingsViewComponent;
}());



/***/ }),

/***/ "./src/app/team-display/team-display.component.css":
/*!*********************************************************!*\
  !*** ./src/app/team-display/team-display.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/team-display/team-display.component.html":
/*!**********************************************************!*\
  !*** ./src/app/team-display/team-display.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container p-3\">\n    <div class=\"row mt-3\" *ngFor=\"let row of rows\">\n        <div class=\"col-4\" *ngFor=\"let item of row\">\n            <mat-card class=\"example-card\">\n                <mat-card-header>\n                    <div mat-card-avatar class=\"example-header-image\"></div>\n                    <mat-card-title><a [routerLink]=\"['/teamProfile/', team.routeFriendlyTeamName(item.teamName)]\">{{item.teamName}}</a></mat-card-title>\n                </mat-card-header>\n                <img mat-card-image src=\"{{teamImage(item.logo)}}\" alt=\"team logo\">\n                <mat-card-content>\n                    <mat-accordion>\n                        <mat-expansion-panel>\n                            <mat-expansion-panel-header>\n                                <mat-panel-title>\n                                    Members\n                                </mat-panel-title>\n                            </mat-expansion-panel-header>\n                            <app-members-display [members]=\"item.teamMembers\"></app-members-display>\n                        </mat-expansion-panel>\n                    </mat-accordion>\n                </mat-card-content>\n            </mat-card>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/team-display/team-display.component.ts":
/*!********************************************************!*\
  !*** ./src/app/team-display/team-display.component.ts ***!
  \********************************************************/
/*! exports provided: TeamDisplayComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeamDisplayComponent", function() { return TeamDisplayComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_team_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/team.service */ "./src/app/services/team.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TeamDisplayComponent = /** @class */ (function () {
    function TeamDisplayComponent(team) {
        this.team = team;
        this._teams = [];
        this.MemberRows = [];
        this.rows = [];
    }
    Object.defineProperty(TeamDisplayComponent.prototype, "teams", {
        get: function () {
            return this._teams;
        },
        set: function (teams) {
            if (teams != null && teams != undefined) {
                this._teams = teams;
                this.createMyDisplay();
            }
            else {
                this._teams = [];
                this.rows = [];
            }
        },
        enumerable: true,
        configurable: true
    });
    TeamDisplayComponent.prototype.teamImage = function (img) {
        if (img == null || img == undefined) {
            return this.team.imageFQDN('defaultTeamLogo.png');
        }
        else {
            return this.team.imageFQDN(img);
        }
    };
    TeamDisplayComponent.prototype.createMyDisplay = function () {
        if (!this.perColumn) {
            this.perColumn = 3;
        }
        this.rows = [];
        if (this._teams != undefined && this._teams.length > 0) {
            if (this._teams.length > this.perColumn) {
                var temparr = [];
                for (var i = 0; i < this._teams.length; i++) {
                    if (i > 0 && i % this.perColumn == 0) {
                        this.rows.push(temparr);
                        temparr = [];
                    }
                    else if (i == this._teams.length - 1) {
                        if (temparr.length > 0) {
                            this.rows.push(temparr);
                        }
                    }
                    temparr.push(this._teams[i]);
                }
            }
            else {
                this.rows.push(this._teams);
            }
        }
        else {
            this.rows = [];
        }
    };
    TeamDisplayComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], TeamDisplayComponent.prototype, "perColumn", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], TeamDisplayComponent.prototype, "teams", null);
    TeamDisplayComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-team-display',
            template: __webpack_require__(/*! ./team-display.component.html */ "./src/app/team-display/team-display.component.html"),
            styles: [__webpack_require__(/*! ./team-display.component.css */ "./src/app/team-display/team-display.component.css")]
        }),
        __metadata("design:paramtypes", [_services_team_service__WEBPACK_IMPORTED_MODULE_1__["TeamService"]])
    ], TeamDisplayComponent);
    return TeamDisplayComponent;
}());



/***/ }),

/***/ "./src/app/team-profile/team-profile.component.css":
/*!*********************************************************!*\
  !*** ./src/app/team-profile/team-profile.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".role-margin {\n    margin: 0 10px;\n}\n\n.icon-align {\n    display: inline-flex;\n    vertical-align: middle;\n}\n\n.material-icons.md-16 {\n    font-size: 16px;\n}\n\n.material-icons.md-18 {\n    font-size: 18px;\n}\n\n.material-icons.md-24 {\n    font-size: 24px;\n}\n\n.material-icons.md-36 {\n    font-size: 36px;\n}\n\n.material-icons.md-48 {\n    font-size: 48px;\n}\n\n.error-avail {\n    border-style: solid;\n    border-width: 2px;\n    border-color: red;\n    padding-left: 10px;\n}\n\n.req-field {\n    color: red;\n    font-size: .80em;\n    font-weight: 600;\n}\n\n.whiteBg {\n    background-color: white;\n}"

/***/ }),

/***/ "./src/app/team-profile/team-profile.component.html":
/*!**********************************************************!*\
  !*** ./src/app/team-profile/team-profile.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" *ngIf=\"showMe\">\n    <div class=\"whiteBg\">\n        <div class=\"row\">\n            <div class=\"col-md-12\">\n                <div>\n                    <!-- captain options -->\n                    <div class=\"row\" *ngIf=\"showEditDialog()\">\n                        <div class=\"col-8 offset-2\">\n                            <div class=\"row mt-3\">\n                                <div class=\"col-6\">\n                                    Welcome to your team profile!\n                                </div>\n                                <div class=\"col-6\">\n                                    <div *ngIf=\"editOn == true\">\n                                        <button type=\"button\" (click)=\"openEdit()\" class=\"btn btn-primary float-right\">Edit</button>\n                                    </div>\n                                    <div class=\"row\" *ngIf=\"!editOn\">\n                                        <div class=\"col\">\n                                            <div class=\"dropdown\">\n                                                <button type=\"button\" class=\"btn btn-danger dropdown-toggle\" id=\"dropdownMenuButton\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n                                                <span class=\"icon-align\">\n                                                    <i class=\"material-icons md-18\">settings</i> \n                                                    Manage \n                                                </span>\n                                            </button>\n                                                <div class=\"dropdown-menu\" aria-labelledby=\"dropdownMenuButton\">\n                                                    <a class=\"dropdown-item finger\" (click)=\"openCaptainChangeDialog()\"><span class=\"icon-align\"><i class=\"material-icons\">cached</i>Change\n                                                        captain</span></a>\n                                                    <a class=\"dropdown-item finger\" (click)=\"openDialog()\"><span class=\"icon-align\"><i class=\"material-icons\">delete_forever</i>Delete team</span></a>\n                                                </div>\n                                            </div>\n\n                                        </div>\n                                        <div class=\"col\">\n                                            <button type=\"button\" [disabled]=\"!validate()\" (click)=\"save()\" class=\"btn btn-success \">Save</button>\n                                        </div>\n                                        <div class=\"col\">\n                                            <button type=\"button\" (click)=\"cancel()\" class=\"btn btn-danger\">Cancel</button>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <!-- admin options -->\n                    <div class=\"row\" *ngIf=\"componentEmbedded\">\n                        <div class=\"col-8 offset-2\">\n                            <div class=\"row\">\n                                <div class=\"col\">\n                                    <div class=\"dropdown\">\n                                        <button type=\"button\" class=\"btn btn-danger dropdown-toggle\" id=\"dropdownMenuButton\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n                                        <span class=\"icon-align\">\n                                            <i class=\"material-icons md-18\">settings</i>\n                                                 Manage\n                                        </span>\n                                    </button>\n                                        <div class=\"dropdown-menu\" aria-labelledby=\"dropdownMenuButton\">\n                                            <a class=\"dropdown-item finger\" (click)=\"openAdminCaptainChangeDialog()\"><span class=\"icon-align\"><i class=\"material-icons\">cached</i>Change captain</span></a>\n                                            <a class=\"dropdown-item finger\" (click)=\"openAdminDeleteDialog()\"><span class=\"icon-align\"><i class=\"material-icons\">delete_forever</i>Delete team</span></a>\n                                        </div>\n                                    </div>\n\n                                </div>\n                                <div class=\"col\">\n                                    <button type=\"button\" (click)=\"adminRefreshMMR()\" class=\"btn btn-info\">Update Team MMR</button>\n                                </div>\n                                <div class=\"col\">\n                                    <button type=\"button\" (click)=\"adminSave()\" class=\"btn btn-success \">Save</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"row mt-3\">\n                    <div class=\"col-sm-12 col-md-5\">\n                        <app-image-upload [showEdit]=\"auth.getUser()===returnedProfile.captain\" [teamName]=\"returnedProfile.teamName\" [teamLogo]=\"returnedProfile.logo\"></app-image-upload>\n                    </div>\n                    <div class=\"col-sm-12 col-md-7\">\n                        <mat-form-field class=\"mat-FullWidth\">\n                            <input matInput placeholder=\"Team Name\" [(ngModel)]=\"returnedProfile.teamName\" (ngModelChange)=\"modelChange()\" [disabled]=\"!componentEmbedded\">\n                        </mat-form-field>\n                        <mat-form-field class=\"mat-FullWidth\">\n                            <input matInput placeholder=\"Team Division\" [(ngModel)]=\"returnedProfile.divisionDisplayName\" disabled=\"true\">\n                        </mat-form-field>\n                        <mat-form-field class=\"mat-FullWidth\">\n                            <input matInput placeholder=\"Team MMR Average\" [(ngModel)]=\"returnedProfile.teamMMRAvg\" disabled=\"true\">\n                        </mat-form-field>\n                        <mat-slide-toggle [disabled]=\"editOn\" [(ngModel)]=\"returnedProfile.lookingForMore\">\n                            Looking for More.\n                        </mat-slide-toggle>\n                    </div>\n                </div>\n\n                <div *ngIf=\"!componentEmbedded\">\n\n                    <!-- add team member -->\n                    <div class=\"row mt-3\" *ngIf=\"!editOn\">\n                        <div class=\"col\">\n                            <h3>Invite users to your team!</h3>\n                            <mat-accordion>\n                                <mat-expansion-panel>\n                                    <mat-expansion-panel-header>\n                                        <mat-panel-title>\n                                            Existing User:\n                                        </mat-panel-title>\n                                        <mat-panel-description>\n                                            Search if user is a member of NGS all ready.\n                                        </mat-panel-description>\n                                    </mat-expansion-panel-header>\n\n                                    <app-user-search [filterUser]=\"filterUsers\" [type]=\"'unteamed'\" [buttonText]=\"'Invite User'\" (userSelected)=\"invite($event)\"></app-user-search>\n\n                                </mat-expansion-panel>\n\n                                <mat-expansion-panel>\n                                    <mat-expansion-panel-header>\n                                        <mat-panel-title>\n                                            New User:\n                                        </mat-panel-title>\n                                        <mat-panel-description>\n                                            Invite a user to join NGS!\n                                        </mat-panel-description>\n                                    </mat-expansion-panel-header>\n                                    <div class=\"row\">\n                                        <div class=\"col-7\">\n                                            <mat-form-field class=\"mat-FullWidth\">\n                                                <input matInput [formControl]=\"emailControl\" [(ngModel)]=\"emailAddress\" placeholder=\"Enter users email to send them an invite to NGS!\">\n                                            </mat-form-field>\n                                        </div>\n                                        <div class=\"col\">\n                                            <button type=\"button\" [disabled]=\"emailControl.invalid\" (click)=\"inviteEmail()\">Invite!</button>\n                                        </div>\n                                    </div>\n\n\n\n                                </mat-expansion-panel>\n                            </mat-accordion>\n                        </div>\n                    </div>\n                    <div class=\"row mt-3\">\n                        <div class=\"col\">\n                            <span class=\"p-3 text-success\">{{message}}</span>\n                        </div>\n                    </div>\n                </div>\n\n\n                <div class=\"row mt-3\">\n                    <div class=\"col\">\n                        <h2>Current Team Members:</h2>\n                    </div>\n                </div>\n                <!-- team members list -->\n                <div class=\"row mt-3\">\n                    <div class=\"col\">\n                        <div class=\"row mt-3\" *ngFor=\"let player of displayMembersLeft\">\n                            <div class=\"col-7\">\n                                <mat-form-field class=\"mat-FullWidth\">\n                                    <input matInput placeholder=\"Player Name\" value={{player.displayName}} disabled=\"true\">\n                                </mat-form-field>\n                            </div>\n                            <div *ngIf=\"showLeaveTeam(player.displayName)\" class=\"col\">\n                                <button class=\"btn btn-danger\" (click)=\"removeMember(player.displayName)\" [disabled]=\"deleteUserButtonOn(player.displayName)\">\n                                Leave Team \n                            </button>\n                            </div>\n                            <div *ngIf=\"!editOn\" class=\"col\">\n                                <button class=\"btn btn-danger\" (click)=\"removeMember(player.displayName)\" [disabled]=\"deleteUserButtonOn(player.displayName)\"> X </button>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"col\">\n                        <div class=\"row mt-3\" *ngFor=\"let player of displayMembersRight\">\n                            <div class=\"col\">\n                                <mat-form-field class=\"mat-FullWidth\">\n                                    <input matInput placeholder=\"Player Name\" value={{player.displayName}} disabled=\"true\">\n                                </mat-form-field>\n                            </div>\n                            <div *ngIf=\"showLeaveTeam(player.displayName)\" class=\"col\">\n                                <button class=\"btn btn-danger\" (click)=\"removeMember(player.displayName)\" [disabled]=\"deleteUserButtonOn(player.displayName)\">\n                                Leave Team \n                            </button>\n                            </div>\n                            <div *ngIf=\"!editOn\" class=\"col\">\n                                <button class=\"btn btn-danger\" (click)=\"removeMember(player.displayName)\" [disabled]=\"deleteUserButtonOn(player.displayName)\"> X </button>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"row mt-3\">\n                    <div class=\"col\">\n                        <mat-form-field class=\"mat-FullWidth\">\n                            <mat-select placeholder=\"Team Competitive Level\" [disabled]=\"editOn\" [(ngModel)]=\"returnedProfile.competitiveLevel\">\n                                <mat-option *ngFor=\"let level of competitonLevel\" [value]=\"level.val\">\n                                    {{level.display}}\n                                </mat-option>\n                            </mat-select>\n                            <mat-hint align=\"start\"><strong>Generally how serious / competitively you're looking to play</strong> </mat-hint>\n                        </mat-form-field>\n                        <mat-form-field class=\"mat-FullWidth\">\n                            <mat-label>Describe the teams play history / style</mat-label>\n                            <textarea matInput cdkTextareaAutosize [(ngModel)]=\"returnedProfile.descriptionOfTeam\" [disabled]=\"editOn\"></textarea>\n                        </mat-form-field>\n                    </div>\n                </div>\n\n                <div class=\"row mt-3\">\n                    <div class=\"col\">\n                        Roles the team needs:\n                        <section>\n                            <mat-checkbox class=\"role-margin\" [(ngModel)]=\"returnedProfile.rolesNeeded.tank\" [disabled]=\"editOn\">Tank</mat-checkbox>\n                            <mat-checkbox class=\"role-margin\" [(ngModel)]=\"returnedProfile.rolesNeeded.offlane\" [disabled]=\"editOn\">Offlane</mat-checkbox>\n                            <mat-checkbox class=\"role-margin\" [(ngModel)]=\"returnedProfile.rolesNeeded.meleeassassin\" [disabled]=\"editOn\">Melee Assassin</mat-checkbox>\n                            <mat-checkbox class=\"role-margin\" [(ngModel)]=\"returnedProfile.rolesNeeded.rangedassassin\" [disabled]=\"editOn\">Ranged Assassin</mat-checkbox>\n                            <mat-checkbox class=\"role-margin\" [(ngModel)]=\"returnedProfile.rolesNeeded.support\" [disabled]=\"editOn\">Support</mat-checkbox>\n                            <mat-checkbox class=\"role-margin\" [(ngModel)]=\"returnedProfile.rolesNeeded.flex\" [disabled]=\"editOn\">Flex</mat-checkbox>\n                        </section>\n                    </div>\n                </div>\n                <!-- Availability Schedule -->\n                <app-times-available [availObj]=\"returnedProfile.availability\" [disabled]=\"editOn\" (availValid)=\"receiveValidTimes($event)\"></app-times-available>\n\n                <div class=\"row mt-3\">\n                    <div class=\"col\">\n                        <mat-form-field class=\"mat-FullWidth\">\n                            <mat-select placeholder=\"Timezone:\" [formControl]=\"timezoneControl\" [(ngModel)]=\"returnedProfile.timeZone\">\n                                <mat-option *ngFor=\"let zone of timezone.timezones\" [value]=\"zone.value\" [disabled]=\"editOn\">\n                                    {{zone.text}}\n                                </mat-option>\n                            </mat-select>\n                            <mat-error *ngIf=\"timezoneControl.hasError('required')\">\n                                Timezone is required\n                            </mat-error>\n                        </mat-form-field>\n                    </div>\n                </div>\n\n                <div class=\"row\" *ngIf=\"showRegisteredQuestionnaire else registered\">\n                    <div class=\"col\">\n                        <app-questionnaire [team]=\"returnedProfile\"></app-questionnaire>\n\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<ng-template #registered>\n    <div class=\"text-center text-success p-5\"> Thanks for registering for NGS Season 6! Good Luck and We'll see you in the Nexus</div>\n</ng-template>"

/***/ }),

/***/ "./src/app/team-profile/team-profile.component.ts":
/*!********************************************************!*\
  !*** ./src/app/team-profile/team-profile.component.ts ***!
  \********************************************************/
/*! exports provided: TeamProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeamProfileComponent", function() { return TeamProfileComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _modal_delete_confrim_modal_delete_confrim_modal_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modal/delete-confrim-modal/delete-confrim-modal.component */ "./src/app/modal/delete-confrim-modal/delete-confrim-modal.component.ts");
/* harmony import */ var _modal_change_captain_modal_change_captain_modal_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../modal/change-captain-modal/change-captain-modal.component */ "./src/app/modal/change-captain-modal/change-captain-modal.component.ts");
/* harmony import */ var _services_timezone_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/timezone.service */ "./src/app/services/timezone.service.ts");
/* harmony import */ var _services_team_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/team.service */ "./src/app/services/team.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _classes_team_class__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../classes/team.class */ "./src/app/classes/team.class.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_admin_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../services/admin.service */ "./src/app/services/admin.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var TeamProfileComponent = /** @class */ (function () {
    //constructor
    function TeamProfileComponent(auth, user, timezone, team, route, dialog, router, admin) {
        this.auth = auth;
        this.user = user;
        this.timezone = timezone;
        this.team = team;
        this.route = route;
        this.dialog = dialog;
        this.router = router;
        this.admin = admin;
        //these properties are used for inputs
        this.editOn = true;
        this.displayDivision = "";
        this.returnedProfile = new _classes_team_class__WEBPACK_IMPORTED_MODULE_8__["Team"](null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
        this.filterUsers = [];
        this.showMe = true;
        this.errorAvail = false;
        this.displayMembersLeft = [];
        this.displayMembersRight = [];
        this.hlMedals = ['Grand Master', 'Master', 'Diamond', 'Platinum', 'Gold', 'Silver', 'Bronze'];
        this.hlDivision = [1, 2, 3, 4, 5];
        this.competitonLevel = [
            { val: 1, display: 'Low' },
            { val: 3, display: 'Medium' },
            { val: 5, display: 'High' }
        ];
        //form controls
        this.timezoneControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_12__["FormControl"]({ value: '', disabled: true }, [
            _angular_forms__WEBPACK_IMPORTED_MODULE_12__["Validators"].required
        ]);
        this.emailControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_12__["FormControl"]({ value: '' }, [
            _angular_forms__WEBPACK_IMPORTED_MODULE_12__["Validators"].email,
            _angular_forms__WEBPACK_IMPORTED_MODULE_12__["Validators"].required
        ]);
        //this boolean will keep up with wether the component is embedded in another or is acting as it's own standalone page
        this.componentEmbedded = false;
        //if this component is used in the admin view the team name can be changed, we must hold on to the old team name to update the proper object
        this.orignalName = null;
        this.embedSource = '';
        this.teamName = team.realTeamName(this.route.snapshot.params['id']);
    }
    TeamProfileComponent.prototype.inviteEmail = function () {
        var _this = this;
        var storedEmail = this.emailAddress;
        this.emailAddress = '';
        if (storedEmail.length > 0) {
            this.user.emailOutreach(storedEmail).subscribe(function (res) {
                _this.message = res['message'];
            }, function (err) {
            });
        }
    };
    //methods
    TeamProfileComponent.prototype.deleteUserButtonOn = function (player) {
        return player == this.returnedProfile.captain;
    };
    TeamProfileComponent.prototype.removeMember = function (player) {
        var _this = this;
        if (this.componentEmbedded) {
            this.admin.removeMembers(this.returnedProfile.teamName_lower, player).subscribe(function (res) {
                // console.log('user removed');
                _this.ngOnInit();
            }, function (err) {
                console.log(err);
            });
        }
        else {
            this.team.removeUser(player, this.returnedProfile.teamName_lower).subscribe(function (res) {
                console.log('user removed');
                _this.ngOnInit();
            }, function (err) {
                console.log(err);
            });
        }
    };
    TeamProfileComponent.prototype.adminRefreshMMR = function () {
        var _this = this;
        this.admin.refreshTeamMMR(this.returnedProfile.teamName_lower).subscribe(function (res) {
            _this.returnedProfile.teamMMRAvg = res.newMMR;
        }, function (err) {
            console.log(err);
        });
    };
    TeamProfileComponent.prototype.formControlledEnable = function () {
        this.timezoneControl.enable();
    };
    TeamProfileComponent.prototype.formControlledDisable = function () {
        this.timezoneControl.disable();
    };
    //init implementation
    TeamProfileComponent.prototype.ngOnInit = function () {
        this.displayMembersLeft = [];
        this.displayMembersRight = [];
        this.returnedProfile = new _classes_team_class__WEBPACK_IMPORTED_MODULE_8__["Team"](null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
        var getProfile;
        // console.log('typeof this.providedProfile: ', typeof this.providedProfile);
        // console.log('his.providedProfile: ', this.providedProfile);
        if (this.providedProfile != null && this.providedProfile != undefined) {
            if (typeof this.providedProfile == 'string') {
                getProfile = this.providedProfile;
                this.orignalName = this.team.realTeamName(this.providedProfile);
                this.getTeamByString(getProfile);
            }
            else {
                Object(lodash__WEBPACK_IMPORTED_MODULE_7__["merge"])(this.returnedProfile, this.providedProfile);
                this.setUpTeamMemberFilter(this.returnedProfile);
                this.stratifyTeamMembers();
                this.orignalName = this.returnedProfile.teamName_lower;
                // this.cleanUpDivision();
            }
        }
        else {
            getProfile = this.teamName;
            this.getTeamByString(getProfile);
        }
    };
    TeamProfileComponent.prototype.setUpTeamMemberFilter = function (teamProfile) {
        var _this = this;
        if (teamProfile.teamMembers && teamProfile.teamMembers.length > 0) {
            teamProfile.teamMembers.forEach(function (element) {
                _this.filterUsers.push(element['displayName']);
            });
        }
        // console.log('teamProfile ',teamProfile);
        if (teamProfile.pendingMembers && teamProfile.pendingMembers.length > 0) {
            teamProfile.pendingMembers.forEach(function (element) {
                _this.filterUsers.push(element['displayName']);
            });
        }
    };
    // this model change method will be bound to the name change input, so we can update the lower case name along with the display name
    TeamProfileComponent.prototype.modelChange = function () {
        // console.log('model change');
        // console.log('this.returnedProfile.teamName ', this.returnedProfile.teamName);
        // console.log('this.returnedProfile.teamName_lower ', this.returnedProfile.teamName_lower);
        if (this.returnedProfile.teamName != this.returnedProfile.teamName_lower) {
            this.returnedProfile.teamName_lower = this.returnedProfile.teamName.toLowerCase();
        }
    };
    Object.defineProperty(TeamProfileComponent.prototype, "passedProfile", {
        //passedProfile binding for when this component is embedded
        set: function (profile) {
            if (profile != null && profile != undefined) {
                this.providedProfile = profile;
                //if we received a profile; the component is embedded:
                this.componentEmbedded = true;
                this.editOn = false;
                this.formControlledEnable();
                this.ngOnInit();
            }
        },
        enumerable: true,
        configurable: true
    });
    TeamProfileComponent.prototype.showRegisteredQuestionnaire = function () {
        if (this.embedSource == 'admin') {
            return true;
        }
        else {
            return !this.returnedProfile.questionnaire['registered'];
        }
    };
    Object.defineProperty(TeamProfileComponent.prototype, "source", {
        set: function (_source) {
            this.embedSource = _source;
        },
        enumerable: true,
        configurable: true
    });
    TeamProfileComponent.prototype.receiveValidTimes = function (event) {
        this.validAvailableTimes = event;
    };
    //this method controls the opening of the change captain modal
    TeamProfileComponent.prototype.openCaptainChangeDialog = function () {
        var _this = this;
        var changeCptDialogRef = this.dialog.open(_modal_change_captain_modal_change_captain_modal_component__WEBPACK_IMPORTED_MODULE_3__["ChangeCaptainModalComponent"], {
            width: '450px',
            data: { members: this.returnedProfile.teamMembers, captain: this.returnedProfile.captain }
        });
        changeCptDialogRef.afterClosed().subscribe(function (result) {
            if (result != undefined && result != null) {
                _this.team.changeCaptain(_this.returnedProfile.teamName_lower, result).subscribe(function (res) {
                    _this.auth.destroyCaptain();
                    _this.ngOnInit();
                }, function (err) {
                    console.log(err);
                });
            }
        });
    };
    //this method opens the admin change captain modal
    TeamProfileComponent.prototype.openAdminCaptainChangeDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(_modal_change_captain_modal_change_captain_modal_component__WEBPACK_IMPORTED_MODULE_3__["ChangeCaptainModalComponent"], {
            width: '450px',
            data: { members: this.returnedProfile.teamMembers, captain: this.returnedProfile.captain }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result != null && result != undefined) {
                _this.admin.changeCaptain(_this.returnedProfile.teamName_lower, result).subscribe(function (res) {
                    _this.returnedProfile = null;
                    _this.returnedProfile = res;
                }, function (err) {
                    console.log(err);
                });
            }
        });
    };
    TeamProfileComponent.prototype.openAdminDeleteDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(_modal_delete_confrim_modal_delete_confrim_modal_component__WEBPACK_IMPORTED_MODULE_2__["DeleteConfrimModalComponent"], {
            width: '300px',
            data: { confirm: this.confirm }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result.toLowerCase() == 'delete') {
                _this.admin.deleteTeam(_this.returnedProfile.teamName_lower).subscribe(function (res) {
                    _this.showMe = false;
                }, function (err) {
                    console.log(err);
                });
            }
        });
    };
    TeamProfileComponent.prototype.openDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(_modal_delete_confrim_modal_delete_confrim_modal_component__WEBPACK_IMPORTED_MODULE_2__["DeleteConfrimModalComponent"], {
            width: '300px',
            data: { confirm: this.confirm }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result.toLowerCase() == 'delete') {
                _this.team.deleteTeam(_this.returnedProfile.teamName_lower).subscribe(function (res) {
                    _this.returnedProfile = null;
                    _this.auth.destroyTeam();
                    _this.auth.destroyCaptain();
                    _this.router.navigate(['/profile', _this.user.routeFriendlyUsername(_this.auth.getUser())]);
                }, function (err) {
                    console.log(err);
                });
            }
        });
    };
    TeamProfileComponent.prototype.adminSave = function () {
        var _this = this;
        if (this.validate()) {
            this.editOn = true;
            this.formControlledDisable();
            var cptRemoved = Object.assign({}, this.returnedProfile);
            delete cptRemoved.captain;
            this.admin.saveTeam(this.orignalName, this.returnedProfile).subscribe(function (res) {
                // console.log('team was saved!');
                _this.orignalName = res.teamName_lower;
                _this.returnedProfile = res;
            }, function (err) {
                console.log(err);
                alert(err.message);
            });
        }
        else {
            //activate validator errors
            console.log('the data was invalid');
        }
    };
    //this method enables form inputs for changes
    TeamProfileComponent.prototype.openEdit = function () {
        this.editOn = false;
        this.formControlledEnable();
        this.tempProfile = Object.assign({}, this.returnedProfile);
    };
    //this method resets the profile back to pre-edit state and disables inputs for changes
    TeamProfileComponent.prototype.cancel = function () {
        this.returnedProfile = Object.assign({}, this.tempProfile);
        this.editOn = true;
        this.formControlledDisable();
    };
    //this method checks that the inputs are valid and if so, saves the team object
    TeamProfileComponent.prototype.save = function () {
        var _this = this;
        if (this.validate()) {
            this.editOn = true;
            this.formControlledDisable();
            var cptRemoved = Object.assign({}, this.returnedProfile);
            delete cptRemoved.captain;
            this.team.saveTeam(cptRemoved).subscribe(function (res) {
                _this.editOn = true;
                _this.formControlledDisable();
            }, function (err) {
                console.log(err);
                alert(err.message);
            });
        }
        else {
            //activate validator errors
            console.log('the data was invalid');
        }
    };
    //method for inviting users to join this team
    TeamProfileComponent.prototype.invite = function (user) {
        var _this = this;
        // console.log(user);
        if (this.returnedProfile.teamName && user) {
            this.team.addUser(user, this.returnedProfile.teamName_lower).subscribe(function (res) {
                _this.message = res.message;
                _this.filterUsers.push(user);
                // console.log(this.filterUsers);
            }, function (err) {
                _this.message = err.error.message;
            });
        }
    };
    //method takes in the factors at hand to show the captain edit options or the admin edit options
    TeamProfileComponent.prototype.showEditDialog = function () {
        if (this.embedSource == 'admin') {
            return false;
        }
        else {
            var isteamcpt = void 0;
            if (this.auth.getCaptain()) {
                isteamcpt = this.auth.getUser() === this.returnedProfile.captain;
            }
            return isteamcpt;
        }
    };
    //method hides or shows days based on whether the team is available or not, and shows all in edit mode.
    TeamProfileComponent.prototype.hideDay = function (editSwitch, dayAvailabilty) {
        if (!editSwitch) {
            return false;
        }
        else {
            if (dayAvailabilty) {
                return false;
            }
            else {
                return true;
            }
        }
    };
    //helper function of dubious helpfulness.
    TeamProfileComponent.prototype.isNullOrEmpty = function (dat) {
        if (dat == null || dat == undefined) {
            return true;
        }
        if (Array.isArray(dat)) {
            if (dat.length == 0) {
                return true;
            }
        }
        else if (typeof dat == 'object') {
            var noe = false;
            for (var key in dat) {
                if (this.isNullOrEmpty(dat[key])) {
                    noe = true;
                }
            }
            return noe;
        }
        else if (typeof dat == "string") {
            return dat.length == 0;
        }
        else {
            return false;
        }
    };
    //method to validate the inputs we require.
    TeamProfileComponent.prototype.validate = function () {
        var valid = true;
        if (!this.validAvailableTimes) {
            valid = false;
        }
        //ensure time zone
        if (this.isNullOrEmpty(this.returnedProfile.timeZone)) {
            valid = false;
            this.timezoneControl.setErrors({ required: true });
        }
        else {
            this.timezoneControl.setErrors(null);
        }
        return valid;
    };
    TeamProfileComponent.prototype.stratifyTeamMembers = function () {
        this.displayMembersLeft = [];
        this.displayMembersRight = [];
        if (this.returnedProfile.teamMembers.length > 3) {
            var half = Math.round(this.returnedProfile.teamMembers.length / 2);
            for (var i = 0; i < half; i++) {
                this.displayMembersLeft.push(this.returnedProfile.teamMembers[i]);
            }
            for (var j = half; j < this.returnedProfile.teamMembers.length; j++) {
                this.displayMembersRight.push(this.returnedProfile.teamMembers[j]);
            }
        }
        else {
            this.displayMembersLeft = this.returnedProfile.teamMembers;
            this.displayMembersRight = [];
        }
    };
    //method to get team by provided string
    TeamProfileComponent.prototype.getTeamByString = function (getProfile) {
        var _this = this;
        this.team.getTeam(getProfile).subscribe(function (res) {
            Object(lodash__WEBPACK_IMPORTED_MODULE_7__["merge"])(_this.returnedProfile, res);
            _this.setUpTeamMemberFilter(_this.returnedProfile);
            _this.stratifyTeamMembers();
            // console.log('team ', this.returnedProfile);
            // this.cleanUpDivision();
        });
    };
    //method to determine if user is a member of a team but not captain
    //shows button to leave team if so, and is not admin embedded
    TeamProfileComponent.prototype.showLeaveTeam = function (playerName) {
        if (this.componentEmbedded) {
            return false;
        }
        else {
            if (this.returnedProfile.teamName == this.auth.getTeam() && this.returnedProfile.captain != this.auth.getUser() && playerName == this.auth.getUser()) {
                return true;
            }
            else {
                return false;
            }
        }
    };
    TeamProfileComponent.prototype.leaveTeam = function () {
        var _this = this;
        this.team.removeUser(this.auth.getUser(), this.returnedProfile.teamName_lower).subscribe(function (res) {
            console.log('team left');
            _this.ngOnInit();
        }, function (err) {
            console.log(err);
        });
    };
    TeamProfileComponent.prototype.imageFQDN = function (img) {
        return this.team.imageFQDN(img);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], TeamProfileComponent.prototype, "passedProfile", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], TeamProfileComponent.prototype, "source", null);
    TeamProfileComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-team-profile',
            template: __webpack_require__(/*! ./team-profile.component.html */ "./src/app/team-profile/team-profile.component.html"),
            styles: [__webpack_require__(/*! ./team-profile.component.css */ "./src/app/team-profile/team-profile.component.css")]
        }),
        __metadata("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_9__["AuthService"], _services_user_service__WEBPACK_IMPORTED_MODULE_10__["UserService"], _services_timezone_service__WEBPACK_IMPORTED_MODULE_4__["TimezoneService"], _services_team_service__WEBPACK_IMPORTED_MODULE_5__["TeamService"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"],
            _services_admin_service__WEBPACK_IMPORTED_MODULE_11__["AdminService"]])
    ], TeamProfileComponent);
    return TeamProfileComponent;
}());



/***/ }),

/***/ "./src/app/team-search/team-search.component.css":
/*!*******************************************************!*\
  !*** ./src/app/team-search/team-search.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/team-search/team-search.component.html":
/*!********************************************************!*\
  !*** ./src/app/team-search/team-search.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-7\">\n        <form class=\"teamSearchForm\">\n            <mat-form-field class=\"tp-FullWidth\">\n                <input matInput placeholder=\"Enter team name\" [(ngModel)]=\"selectedTeam\" aria-label=\"Enter team name\" [matAutocomplete]=\"auto\" [formControl]=\"teamCtrl\">\n                <mat-autocomplete #auto=\"matAutocomplete\">\n                    <mat-option *ngFor=\"let name of foundTeams \" [value]=\"name\">\n                        {{name}}\n                    </mat-option>\n                </mat-autocomplete>\n            </mat-form-field>\n        </form>\n    </div>\n    <div class=\"col\">\n        <button type=\"button\" (click)=\"nameSelect(selectedTeam)\"> {{btnTxt}} </button>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/team-search/team-search.component.ts":
/*!******************************************************!*\
  !*** ./src/app/team-search/team-search.component.ts ***!
  \******************************************************/
/*! exports provided: TeamSearchComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeamSearchComponent", function() { return TeamSearchComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _services_team_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/team.service */ "./src/app/services/team.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TeamSearchComponent = /** @class */ (function () {
    function TeamSearchComponent(team) {
        var _this = this;
        this.team = team;
        this.lastChange = 0;
        this.cantClick = false;
        this.teamSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.teamCtrl = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]();
        this.teamCtrl.valueChanges.subscribe(function (data) {
            if (data && data.length > 2) {
                //give this a delay so we don't swamp the server with calls! .875 seconds to make call
                var timestamp = Date.now();
                if (timestamp - _this.lastChange > 1000) {
                    _this.lastChange = timestamp;
                    _this.team.teamSearch(data).subscribe(function (res) {
                        _this.foundTeams = res;
                    });
                }
            }
        });
    }
    TeamSearchComponent.prototype.nameSelect = function (user) {
        this.priorSelect = user;
        this.teamSelected.emit(user);
    };
    Object.defineProperty(TeamSearchComponent.prototype, "buttonText", {
        set: function (text) {
            if (text != undefined && text != null) {
                this.btnTxt = text;
            }
            else {
                this.btnTxt = "Seach";
            }
        },
        enumerable: true,
        configurable: true
    });
    TeamSearchComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], TeamSearchComponent.prototype, "teamSelected", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], TeamSearchComponent.prototype, "buttonText", null);
    TeamSearchComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-team-search',
            template: __webpack_require__(/*! ./team-search.component.html */ "./src/app/team-search/team-search.component.html"),
            styles: [__webpack_require__(/*! ./team-search.component.css */ "./src/app/team-search/team-search.component.css")]
        }),
        __metadata("design:paramtypes", [_services_team_service__WEBPACK_IMPORTED_MODULE_2__["TeamService"]])
    ], TeamSearchComponent);
    return TeamSearchComponent;
}());



/***/ }),

/***/ "./src/app/times-available/times-available.component.css":
/*!***************************************************************!*\
  !*** ./src/app/times-available/times-available.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".error-avail {\n    border-style: solid;\n    border-width: 2px;\n    border-color: red;\n    padding-left: 10px;\n}\n\n.req-field {\n    color: red;\n    font-size: .80em;\n    font-weight: 600;\n}"

/***/ }),

/***/ "./src/app/times-available/times-available.component.html":
/*!****************************************************************!*\
  !*** ./src/app/times-available/times-available.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row mt-3\">\n    <div class=\"col\">\n        {{displayText}} <span class=\"req-field\">*At least one time is required.</span>\n        <div class=\"row\" *ngIf=\"!editOn && errorReply.length>0\">\n            <div class=\"col req-field\">\n                {{errorReply}}\n            </div>\n        </div>\n    </div>\n</div>\n<div [ngClass]=\"{'error-avail':errorAvail}\">\n    <div class=\"row mt-3\">\n        <div class=\"col\">\n            <mat-checkbox [(ngModel)]=\"availability.monday.available\" [disabled]=\"editOn\">Monday</mat-checkbox>\n        </div>\n        <div class=\"col\">\n            <mat-form-field>\n                <input matInput type=\"time\" [(ngModel)]=\"availability.monday.startTime\" placeholder=\"Start Time\" [disabled]=\"editOn\">\n            </mat-form-field>\n        </div>\n        <div class=\"col\">\n            <mat-form-field>\n                <input matInput [(ngModel)]=\"availability.monday.endTime\" type=\"time\" placeholder=\"End Time\" [disabled]=\"editOn\">\n            </mat-form-field>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col\">\n            <mat-checkbox class=\"\" [(ngModel)]=\"availability.tuesday.available\" [disabled]=\"editOn\">Tuesday</mat-checkbox>\n        </div>\n        <div class=\"col\">\n            <mat-form-field>\n                <input matInput type=\"time\" [(ngModel)]=\"availability.tuesday.startTime\" placeholder=\"Start Time\" [disabled]=\"editOn\">\n            </mat-form-field>\n        </div>\n        <div class=\"col\">\n            <mat-form-field>\n                <input matInput type=\"time\" [(ngModel)]=\"availability.tuesday.endTime\" placeholder=\"End Time\" [disabled]=\"editOn\">\n            </mat-form-field>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col\">\n            <mat-checkbox class=\"\" [(ngModel)]=\"availability.wednesday.available\" [disabled]=\"editOn\">Wednesday</mat-checkbox>\n        </div>\n        <div class=\"col\">\n            <mat-form-field>\n                <input matInput type=\"time\" [(ngModel)]=\"availability.wednesday.startTime\" placeholder=\"Start Time\" [disabled]=\"editOn\">\n            </mat-form-field>\n        </div>\n        <div class=\"col\">\n            <mat-form-field>\n                <input matInput type=\"time\" [(ngModel)]=\"availability.wednesday.endTime\" placeholder=\"End Time\" [disabled]=\"editOn\">\n            </mat-form-field>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col\">\n            <mat-checkbox class=\"\" [(ngModel)]=\"availability.thursday.available\" [disabled]=\"editOn\">Thursday</mat-checkbox>\n        </div>\n        <div class=\"col\">\n            <mat-form-field>\n                <input matInput type=\"time\" [(ngModel)]=\"availability.thursday.startTime\" placeholder=\"Start Time\" [disabled]=\"editOn\">\n            </mat-form-field>\n        </div>\n        <div class=\"col\">\n            <mat-form-field>\n                <input matInput type=\"time\" [(ngModel)]=\"availability.thursday.endTime\" placeholder=\"End Time\" [disabled]=\"editOn\">\n            </mat-form-field>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col\">\n            <mat-checkbox class=\"\" [(ngModel)]=\"availability.friday.available\" [disabled]=\"editOn\">Friday</mat-checkbox>\n        </div>\n        <div class=\"col\">\n            <mat-form-field>\n                <input matInput type=\"time\" [(ngModel)]=\"availability.friday.startTime\" placeholder=\"Start Time\" [disabled]=\"editOn\">\n            </mat-form-field>\n        </div>\n        <div class=\"col\">\n            <mat-form-field>\n                <input matInput type=\"time\" [(ngModel)]=\"availability.friday.endTime\" placeholder=\"End Time\" [disabled]=\"editOn\">\n            </mat-form-field>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col\">\n            <mat-checkbox class=\"\" [(ngModel)]=\"availability.saturday.available\" [disabled]=\"editOn\">Saturday</mat-checkbox>\n        </div>\n        <div class=\"col\">\n            <mat-form-field>\n                <input matInput type=\"time\" [(ngModel)]=\"availability.saturday.startTime\" placeholder=\"Start Time\" [disabled]=\"editOn\">\n            </mat-form-field>\n        </div>\n        <div class=\"col\">\n            <mat-form-field>\n                <input matInput type=\"time\" [(ngModel)]=\"availability.saturday.endTime\" placeholder=\"End Time\" [disabled]=\"editOn\">\n            </mat-form-field>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col\">\n            <mat-checkbox class=\"\" [(ngModel)]=\"availability.sunday.available\" [disabled]=\"editOn\">Sunday</mat-checkbox>\n        </div>\n        <div class=\"col\">\n            <mat-form-field>\n                <input matInput type=\"time\" [(ngModel)]=\"availability.sunday.startTime\" placeholder=\"Start Time\" [disabled]=\"editOn\">\n            </mat-form-field>\n        </div>\n        <div class=\"col\">\n            <mat-form-field>\n                <input matInput type=\"time\" [(ngModel)]=\"availability.sunday.endTime\" placeholder=\"End Time\" [disabled]=\"editOn\">\n            </mat-form-field>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/times-available/times-available.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/times-available/times-available.component.ts ***!
  \**************************************************************/
/*! exports provided: TimesAvailableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimesAvailableComponent", function() { return TimesAvailableComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_utilities_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/utilities.service */ "./src/app/services/utilities.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TimesAvailableComponent = /** @class */ (function () {
    function TimesAvailableComponent(util) {
        this.util = util;
        this.availability = {
            "monday": {
                "available": false,
                "startTime": null,
                "endTime": null
            },
            "tuesday": {
                "available": false,
                "startTime": null,
                "endTime": null
            },
            "wednesday": {
                "available": false,
                "startTime": null,
                "endTime": null
            },
            "thursday": {
                "available": false,
                "startTime": null,
                "endTime": null
            },
            "friday": {
                "available": false,
                "startTime": null,
                "endTime": null
            },
            "saturday": {
                "available": false,
                "startTime": null,
                "endTime": null
            },
            "sunday": {
                "available": false,
                "startTime": null,
                "endTime": null
            }
        };
        this.errorAvail = false;
        this.errorReply = '';
        this.displayText = 'Times the team plays and practices:';
        this.editOn = false;
        this.availValid = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    TimesAvailableComponent.prototype.hell = function () {
        console.log(this.availability);
    };
    TimesAvailableComponent.prototype.ngOnInit = function () {
    };
    Object.defineProperty(TimesAvailableComponent.prototype, "availObj", {
        set: function (_obj) {
            if (typeof _obj == 'object' && _obj != null && _obj != undefined) {
                this.availability = Object.assign({}, _obj);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimesAvailableComponent.prototype, "customText", {
        set: function (_text) {
            if (typeof _text == 'string' && _text != null && _text != undefined) {
                this.displayText = _text;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimesAvailableComponent.prototype, "disabled", {
        set: function (_editOn) {
            if (typeof _editOn == 'boolean' && _editOn != null && _editOn != undefined) {
                this.editOn = _editOn;
            }
        },
        enumerable: true,
        configurable: true
    });
    TimesAvailableComponent.prototype.ngDoCheck = function () {
        this.checkAvailabilityDays();
    };
    TimesAvailableComponent.prototype.emitValid = function () {
        this.availValid.emit('?');
    };
    TimesAvailableComponent.prototype.modelChange = function () {
        console.log('model is changing!');
    };
    //check that the availability exists and that at least one day has been set to true and has time
    TimesAvailableComponent.prototype.checkAvailabilityDays = function () {
        var ret = true;
        var nodays = 0;
        //validate that we have start and end times for available days
        for (var day in this.availability) {
            var checkDay = this.availability[day];
            if (checkDay.available) {
                if (checkDay.startTime == null || checkDay.startTime.length == 0) {
                    this.errorReply = day.substring(0, 1).toUpperCase() + day.substring(1, day.length) + " start time required!";
                    ret = false;
                }
                else if (checkDay.endTime == null || checkDay.endTime.length == 0) {
                    this.errorReply = day.substring(0, 1).toUpperCase() + day.substring(1, day.length) + " end time required!";
                    ret = false;
                    ret = false;
                }
                else if (false) {}
                else {
                    var endTimeStrArr = checkDay.endTime.split(':');
                    var endTime = new Date();
                    endTime.setMinutes(endTimeStrArr[1]);
                    endTime.setHours(endTimeStrArr[0]);
                    var startTime = new Date();
                    var startTimeStrArr = checkDay.startTime.split(':');
                    startTime.setMinutes(startTimeStrArr[1]);
                    startTime.setHours(startTimeStrArr[0]);
                    if (startTime >= endTime) {
                        this.errorReply = day.substring(0, 1).toUpperCase() + day.substring(1, day.length) + " end time must be later than start time!";
                        ret = false;
                    }
                }
            }
            else {
                nodays += 1;
            }
        }
        if (nodays == 7) {
            ret = false;
            this.errorReply = 'Must include at least 1 day of availability';
        }
        if (ret) {
            this.errorReply = '';
        }
        this.errorAvail = !ret;
        this.availValid.emit(ret);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], TimesAvailableComponent.prototype, "availObj", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], TimesAvailableComponent.prototype, "customText", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], TimesAvailableComponent.prototype, "disabled", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], TimesAvailableComponent.prototype, "availValid", void 0);
    TimesAvailableComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-times-available',
            template: __webpack_require__(/*! ./times-available.component.html */ "./src/app/times-available/times-available.component.html"),
            styles: [__webpack_require__(/*! ./times-available.component.css */ "./src/app/times-available/times-available.component.css")]
        }),
        __metadata("design:paramtypes", [_services_utilities_service__WEBPACK_IMPORTED_MODULE_1__["UtilitiesService"]])
    ], TimesAvailableComponent);
    return TimesAvailableComponent;
}());



/***/ }),

/***/ "./src/app/user-search/user-search.component.css":
/*!*******************************************************!*\
  !*** ./src/app/user-search/user-search.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/user-search/user-search.component.html":
/*!********************************************************!*\
  !*** ./src/app/user-search/user-search.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <input matInput placeholder=\"Battle tag\" [matAutocomplete]=\"auto\">\n<mat-autocomplete #auto=\"matAutocomplete\" [displayWith]=\"displayFn\">\n    <mat-option *ngFor=\"let btag of getUsers | async\" [value]=\"btag\">{{btag}}</mat-option>\n</mat-autocomplete> -->\n<div class=\"row\">\n    <div class=\"col-7\">\n        <form class=\"userSearchForm\">\n            <mat-form-field class=\"mat-FullWidth\">\n                <input matInput placeholder=\"Enter battle tag\" [(ngModel)]=\"selectedUser\" aria-label=\"Enter battle tag\" [matAutocomplete]=\"auto\" [formControl]=\"userCtrl\">\n                <mat-autocomplete #auto=\"matAutocomplete\">\n                    <mat-option *ngFor=\"let btag of foundUsers \" [value]=\"btag\">\n                        {{btag}}\n                    </mat-option>\n                </mat-autocomplete>\n            </mat-form-field>\n        </form>\n    </div>\n    <div class=\"col\">\n        <button type=\"button\" [disabled]=\"disableButton\" (click)=\"userSelect(selectedUser)\"> {{btnTxt}} </button>\n    </div>\n</div>\n\n<div><span>{{message}}</span></div>"

/***/ }),

/***/ "./src/app/user-search/user-search.component.ts":
/*!******************************************************!*\
  !*** ./src/app/user-search/user-search.component.ts ***!
  \******************************************************/
/*! exports provided: UserSearchComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserSearchComponent", function() { return UserSearchComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/auth.service */ "./src/app/services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UserSearchComponent = /** @class */ (function () {
    function UserSearchComponent(users, Auth) {
        var _this = this;
        this.users = users;
        this.Auth = Auth;
        this.usersToFilter = [];
        this.lastChange = 0;
        this.cantClick = false;
        this.disableButton = false;
        this.userSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.userSearchType = 'all';
        this.userCtrl = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]();
        this.userCtrl.valueChanges.subscribe(function (data) {
            if (data && data.length > 2) {
                _this.disableButton = false;
                //give this a delay so we don't swamp the server with calls! .875 seconds to make call
                var timestamp = Date.now();
                if (timestamp - _this.lastChange > 1000) {
                    _this.lastChange = timestamp;
                    _this.users.userSearch(data, _this.userSearchType).subscribe(function (res) {
                        _this.foundUsers = _this.filterUsers(res, _this.usersToFilter);
                    });
                }
            }
        });
    }
    UserSearchComponent.prototype.userSelect = function (user) {
        this.priorSelect = this.selectedUser;
        this.selectedUser = user;
        this.disableButton = true;
        this.userSelected.emit(user);
    };
    Object.defineProperty(UserSearchComponent.prototype, "buttonText", {
        set: function (text) {
            if (text != undefined && text != null) {
                this.btnTxt = text;
            }
            else {
                this.btnTxt = "Seach";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserSearchComponent.prototype, "type", {
        set: function (_type) {
            if (_type != null && _type != undefined && _type.length > 0) {
                this.userSearchType = _type;
            }
            else {
                this.userSearchType = 'all';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserSearchComponent.prototype, "filterUser", {
        set: function (users) {
            if (users != null && users != undefined && users.length > 0) {
                this.usersToFilter = users;
            }
            else {
                this.usersToFilter = [];
            }
        },
        enumerable: true,
        configurable: true
    });
    UserSearchComponent.prototype.filterUsers = function (master, remove) {
        console.log('master ', master, 'remove ', remove);
        remove.forEach(function (element) {
            var index = master.indexOf(element);
            if (index > -1) {
                master.splice(index, 1);
            }
        });
        return master;
    };
    UserSearchComponent.prototype.ngOnInit = function () {
        this.usersToFilter.push(this.Auth.getUser());
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], UserSearchComponent.prototype, "userSelected", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], UserSearchComponent.prototype, "buttonText", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], UserSearchComponent.prototype, "type", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], UserSearchComponent.prototype, "filterUser", null);
    UserSearchComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-user-search',
            template: __webpack_require__(/*! ./user-search.component.html */ "./src/app/user-search/user-search.component.html"),
            styles: [__webpack_require__(/*! ./user-search.component.css */ "./src/app/user-search/user-search.component.css")]
        }),
        __metadata("design:paramtypes", [_services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"], _services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"]])
    ], UserSearchComponent);
    return UserSearchComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: true,
    contentful: {
        spaceID: 'b73d407c7z3q',
        token: '173bbb7627a7cdc82292e2a99d28d5004612fbc724a4e74a643629c67d98919f',
        categoryIDs: {
            news: '4bGp5zRaVOAmO2gaMuagEO',
            jumbotron: '28BCNlBF6Msggwa2ECkokm'
        }
    },
    s3bucketImages: 'dev-ngs-image-storage',
    s3bucketReplays: 'dev-ngs-replay-storage'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! A:\coding\professionalProjects\ngs-mean-core\client\src\main.ts */"./src/main.ts");


/***/ }),

/***/ 1:
/*!********************!*\
  !*** os (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map