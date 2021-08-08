"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var core_1 = require("@material-ui/core");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var luxon_1 = require("luxon");
// material-ui icons
var Save_1 = require("@material-ui/icons/Save");
var Info_1 = require("@material-ui/icons/Info");
var Edit_1 = require("@material-ui/icons/Edit");
var Lock_1 = require("@material-ui/icons/Lock");
var Button_1 = require("../../components/CustomButtons/Button");
var Table_1 = require("../../components/Table/Table");
var graphqlTypes_1 = require("../../graphql/graphqlTypes");
var task_service_1 = require("../../services/task.service");
var extendedTablesStyle_1 = require("../../assets/jss/material-dashboard-react/views/extendedTablesStyle");
var MainContext_1 = require("../../context/MainContext");
var react_chartist_1 = require("react-chartist");
// core components
var GridItem_1 = require("../../components/Grid/GridItem");
var GridContainer_1 = require("../../components/Grid/GridContainer");
var Card_1 = require("../../components/Card/Card");
var CardHeader_1 = require("../../components/Card/CardHeader");
var CardBody_1 = require("../../components/Card/CardBody");
var CardFooter_1 = require("../../components/Card/CardFooter");
var icons_1 = require("@material-ui/icons");
var WebSocketContext_1 = require("../../context/WebSocketContext");
var round_1 = require("../../utils/round");
var useStyles = core_1.makeStyles(extendedTablesStyle_1["default"]);
var TasksList = function () {
    var _a = react_1.useState([]), tasks = _a[0], setTasks = _a[1];
    var _b = react_1.useState(false), openInfo = _b[0], setOpenInfo = _b[1];
    var _c = react_1.useState(false), openLock = _c[0], setOpenLock = _c[1];
    var _d = react_1.useState({
        labels: [''],
        series: [0],
        savedOn: ''
    }), chartData = _d[0], setChartData = _d[1];
    var _e = react_1.useState(0), taskId = _e[0], setTaskId = _e[1];
    var classes = useStyles();
    var role = react_1.useContext(MainContext_1.MainContext).role;
    var currentMessage = react_1.useContext(WebSocketContext_1.WebSocketContext).currentMessage;
    var history = react_router_dom_1.useHistory();
    react_1.useEffect(function () {
        function loadTasks() {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, task_service_1.getAllTasks()];
                        case 1:
                            res = _a.sent();
                            setTasks(res);
                            return [2 /*return*/];
                    }
                });
            });
        }
        loadTasks();
        return function () { };
    }, []);
    react_1.useEffect(function () {
        function loadTasks() {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, task_service_1.getAllTasks()];
                        case 1:
                            res = _a.sent();
                            setTasks(res);
                            return [2 /*return*/];
                    }
                });
            });
        }
        loadTasks();
        return function () { };
    }, [currentMessage, role]);
    var currentTask = react_1.useMemo(function () {
        var currentTaskIndex = tasks.findIndex(function (x) { return x.id === taskId; });
        if (currentTaskIndex !== -1)
            return tasks[currentTaskIndex];
        else
            return undefined;
    }, [taskId, tasks]);
    console.log('currentTask', currentTask);
    var showTaskInfo = function (key) {
        var t = tasks.find(function (t) { return t.id === key; });
        if (t) {
            var totalKeysCount = t.totalKeysCount, pendingKeysCount = t.pendingKeysCount, savedOn = t.savedOn;
            var pending = pendingKeysCount / totalKeysCount;
            var complete = (totalKeysCount - pendingKeysCount) / totalKeysCount;
            setChartData({
                labels: ["Pending " + round_1.round(pending) + "%", "Completed " + round_1.round(complete) + "%"],
                series: [round_1.round(pending), round_1.round(complete)],
                savedOn: savedOn
            });
        }
        handleInfoOpen(key);
    };
    var editTask = function (key) {
        history.push("/translator/tasks/" + key);
    };
    var handleLockOpen = function (key) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            setOpenLock(true);
            setTaskId(key);
            return [2 /*return*/];
        });
    }); };
    var handleInfoOpen = function (key) {
        setOpenInfo(true);
        setTaskId(key);
    };
    var handleInfoClose = function () {
        setOpenInfo(false);
    };
    var handleLockClose = function () {
        setOpenLock(false);
    };
    var handleLockTask = function (key) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setTaskId(key);
                    return [4 /*yield*/, task_service_1.toggleLockTask(key)];
                case 1:
                    _a.sent();
                    setOpenLock(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var handleTranslatorSubmit = function (key) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!key) return [3 /*break*/, 2];
                    return [4 /*yield*/, task_service_1.proofreadTask(key)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    var handleAdminRelease = function (key) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('handleTranslatorSubmit', key);
                    if (!key) return [3 /*break*/, 2];
                    return [4 /*yield*/, task_service_1.releaseTask(key)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    var getLockIcon = function (role, isLocked) {
        switch (role) {
            case graphqlTypes_1.UserRole.Translator:
                return isLocked ? Lock_1["default"] : Edit_1["default"];
            case graphqlTypes_1.UserRole.Admin:
            case graphqlTypes_1.UserRole.Owner:
            default:
                return isLocked ? Lock_1["default"] : icons_1.LockOpen;
        }
    };
    var checkShouldDisable = function (role, taskId) {
        console.log('role', role);
        switch (role) {
            case graphqlTypes_1.UserRole.Translator: {
                var currentTaskIndex = tasks.findIndex(function (x) { return x.id === taskId; });
                var currentTask_1 = currentTaskIndex === -1 ? undefined : tasks[currentTaskIndex];
                if (!currentTask_1)
                    return Edit_1["default"];
                return [graphqlTypes_1.TaskStatus.Locked, graphqlTypes_1.TaskStatus.Released].includes(currentTask_1 === null || currentTask_1 === void 0 ? void 0 : currentTask_1.status)
                    ? Lock_1["default"]
                    : Edit_1["default"];
            }
            case graphqlTypes_1.UserRole.Admin:
            case graphqlTypes_1.UserRole.Owner:
            default: {
                var currentTaskIndex = tasks.findIndex(function (x) { return x.id === taskId; });
                var currentTask_2 = currentTaskIndex === -1 ? undefined : tasks[currentTaskIndex];
                if (!currentTask_2)
                    return icons_1.LockOpen;
                return currentTask_2.status === graphqlTypes_1.TaskStatus.Locked ? icons_1.LockOpen : Lock_1["default"];
            }
        }
    };
    var simpleButtons = function (_a) {
        var role = _a.role, taskId = _a.taskId;
        var allBtns = [
            {
                color: 'info',
                icon: Info_1["default"],
                handler: showTaskInfo,
                roles: [graphqlTypes_1.UserRole.Admin, graphqlTypes_1.UserRole.Owner]
            },
            {
                color: 'success',
                icon: getLockIcon(role, role === graphqlTypes_1.UserRole.Translator && taskId === 2),
                handler: editTask,
                disabled: checkShouldDisable(role, taskId),
                roles: [graphqlTypes_1.UserRole.Translator]
            },
            {
                color: 'danger',
                icon: getLockIcon(role, role !== graphqlTypes_1.UserRole.Translator &&
                    (currentTask === null || currentTask === void 0 ? void 0 : currentTask.status) === graphqlTypes_1.TaskStatus.Released),
                handler: handleLockOpen,
                disabled: role !== graphqlTypes_1.UserRole.Translator &&
                    (currentTask === null || currentTask === void 0 ? void 0 : currentTask.status) === graphqlTypes_1.TaskStatus.Released,
                roles: [graphqlTypes_1.UserRole.Admin, graphqlTypes_1.UserRole.Owner]
            },
            {
                color: 'info',
                icon: icons_1.Save,
                handler: handleTranslatorSubmit,
                disabled: role === graphqlTypes_1.UserRole.Translator &&
                    (currentTask === null || currentTask === void 0 ? void 0 : currentTask.status) === graphqlTypes_1.TaskStatus.Released,
                roles: [graphqlTypes_1.UserRole.Translator]
            },
            {
                color: 'success',
                icon: icons_1.Publish,
                handler: handleAdminRelease,
                disabled: role !== graphqlTypes_1.UserRole.Translator &&
                    (currentTask === null || currentTask === void 0 ? void 0 : currentTask.status) === graphqlTypes_1.TaskStatus.Released,
                roles: [graphqlTypes_1.UserRole.Admin, graphqlTypes_1.UserRole.Owner]
            },
        ];
        var userBtns = allBtns.filter(function (btn) {
            return btn.roles.includes(role);
        });
        var btns = userBtns.map(function (prop, key) {
            return (React.createElement(Button_1["default"], { color: prop.color, disabled: prop === null || prop === void 0 ? void 0 : prop.disabled, simple: true, onClick: function (e) { return prop.handler(taskId); }, className: classes.actionButton, key: key },
                React.createElement(prop.icon, { className: classes.icon })));
        });
        return btns;
    };
    var mappedTasks = tasks.map(function (task) { return [
        task.id,
        task.name,
        task.savedOn,
        task.status === graphqlTypes_1.TaskStatus.Locked ? 'Y' : 'N',
        simpleButtons({
            role: role,
            taskId: task.id
        }),
    ]; });
    console.log('bbb', role === graphqlTypes_1.UserRole.Translator);
    return (React.createElement(React.Fragment, null,
        React.createElement(Card_1["default"], null,
            React.createElement(CardBody_1["default"], null,
                !tasks.length && React.createElement("h3", null, "No task found."),
                !!tasks.length && (React.createElement(React.Fragment, null,
                    React.createElement(Table_1["default"], { tableHead: ['#', 'Name', 'Updated On', 'Is Locked?', 'Actions'], tableData: __spreadArrays(mappedTasks), customCellClasses: [], customClassesForCells: [], customHeadCellClasses: [], customHeadClassesForCells: [] }),
                    React.createElement(core_1.Dialog, { open: openInfo, onClose: handleInfoClose, "aria-labelledby": "form-dialog-title" },
                        React.createElement(core_1.DialogTitle, { id: "form-dialog-title" }, "Task Statistics"),
                        React.createElement(core_1.DialogContent, null,
                            React.createElement(GridContainer_1["default"], null,
                                React.createElement(GridItem_1["default"], { xs: 12, sm: 12, md: 12 },
                                    React.createElement(Card_1["default"], { chart: true },
                                        React.createElement(CardHeader_1["default"], { color: "success" },
                                            React.createElement(react_chartist_1["default"], { className: "ct-chart", data: chartData, type: "Pie" })),
                                        React.createElement(CardBody_1["default"], null),
                                        React.createElement(CardFooter_1["default"], { chart: true },
                                            React.createElement("div", { className: classes.stats },
                                                React.createElement(icons_1.AccessTime, null),
                                                " updated on",
                                                ' ',
                                                luxon_1.DateTime.fromISO(chartData.savedOn, {
                                                    zone: 'Australia/Sydney'
                                                })
                                                    .toLocal()
                                                    .toLocaleString(luxon_1.DateTime.DATETIME_SHORT_WITH_SECONDS))))))),
                        React.createElement(core_1.DialogActions, null,
                            React.createElement(Button_1["default"], { onClick: handleInfoClose, color: "primary" }, "close"))),
                    React.createElement(core_1.Dialog, { open: openLock, onClose: handleLockClose, "aria-labelledby": "form-dialog-title" },
                        React.createElement(core_1.DialogTitle, { id: "form-dialog-title" }, "Enter translation"),
                        React.createElement(core_1.DialogContent, null,
                            React.createElement(core_1.DialogContentText, null,
                                "Please Confirm that you want to",
                                ' ',
                                (currentTask === null || currentTask === void 0 ? void 0 : currentTask.status) === graphqlTypes_1.TaskStatus.Locked
                                    ? 'unlock'
                                    : 'lock',
                                ' ',
                                "this task.")),
                        React.createElement(core_1.DialogActions, null,
                            React.createElement(Button_1["default"], { onClick: handleLockClose, color: "primary" }, "Cancel"),
                            React.createElement(Button_1["default"], { onClick: handleLockTask, color: "primary" }, "Submit")))))),
            React.createElement(CardFooter_1["default"], null, role && role !== graphqlTypes_1.UserRole.Translator && (React.createElement(Button_1["default"], { variant: "contained", color: "primary", startIcon: React.createElement(Save_1["default"], null), component: react_router_dom_1.NavLink, to: "/admin/tasks/create" }, "Create New Task"))))));
};
exports["default"] = TasksList;
