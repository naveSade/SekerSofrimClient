'use strict';
var saveData;
$(document).ready(function () {

    var debug = false;
    var debugStartScreen = 0;
    var APIUrl = 'https://7npxc1c5ll.execute-api.us-west-2.amazonaws.com/SekerSofrim/';
    // JavaScript source code
    var config = {
        messages: "getmessages",
        authentication: "getconnecteduser",
        id: "idlogin",
        password: {
            confirm: "passwordlogin",
            reset: "resetpassword"
        },
        userNotExist: "requestupdateuserdetails",
        noDetails: "requestupdateuserdetails",
        userArea: "updateuserdetails",
        manage: {
            upload: "uploaduserscsv",
            download: "getuserscsv",
            tableRow: "confirmuserdetails",
            getTableRows: "getuserdetailsconfirms"
        },
        logout: "logout"
    };

    var s = {
        body: $('body'),
        navbar: $('.navbar'),
        container: $('.container.body'),
        sections: {
            welcom: $('#welcom'),
            id: $('#id'),
            password: $('#password'),
            userNotExist: $('#userNotExist'),
            thanksForDetails: $('#thanksForDetails'),
            noDetails: $('#noDetails'),
            userArea: $('#userArea'),
            manageArea: $('#manageArea'),
            error: $('#error')
        },
        uploadFile: $('#uploadFile'),
        messages: $('#messages'),
        logout: $('#logout')
    };

    s.val = [
        { //0
        }, { //1
            id: s.sections.id.find('input')
        }, { //2
            password: s.sections.password.find('input')
        }, { //3
            firstName: $(s.sections.userNotExist.find('input')[0]),
            lastName: $(s.sections.userNotExist.find('input')[1]),
            email: $(s.sections.userNotExist.find('input')[2]),
            phone: $(s.sections.userNotExist.find('input')[3]),
            tel: $(s.sections.userNotExist.find('input')[4]),
        }, { //4
        }, { //5
            firstName: $(s.sections.noDetails.find('input')[0]),
            lastName: $(s.sections.noDetails.find('input')[1]),
            email: $(s.sections.noDetails.find('input')[2]),
            phone: $(s.sections.noDetails.find('input')[3]),
            tel: $(s.sections.noDetails.find('input')[4]),
        }, { //6
        }, { //7
            download: s.sections.manageArea.find('#uploadFile'),
        }
    ]

    s.btn = [
        {//0
        }, {//1
            confirm: s.sections.id.find('button[to="confirm"]')
        }, {//2
            confirm: s.sections.password.find('button[to="confirm"]'),
            reset: s.sections.password.find('button[to="reset"]')
        }, {//3
            confirm: s.sections.userNotExist.find('button[to="confirm"]'),
            tryAgain: s.sections.userNotExist.find('button[to="tryAgain"]')
        }, {//4
        }, {//5
            confirm: s.sections.noDetails.find('button[to="confirm"]')
        }, {//6
        }, {//7
            download: s.sections.manageArea.find('button[to="download"]'),
            upload: s.sections.manageArea.find('button[to="upload"]')
        }
    ]

    var p = {
        welcom: 0,
        id: 1,
        password: 2,
        userNotExist: 3,
        thanksForDetails: 4,
        noDetails: 5,
        userArea: 6,
        manageArea: 7,
        error: 8
    };

    var regex = {
        email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    };

    var messageDemo = [
        { text: "שימו לב! רשימת הזוכים תפורסם ב15.8.17", id: 1 },
        { text: "לידיעת ציבור הסופרים, ניתן להגיש בקשת זכיה לא יאוחר מה-27.9.16", id: 2 },
        { text: "המסחר בבורסה נסגר בירידות שערים של כ-15% ו4 עשיריות האגורה", id: 3 }
    ]

    var tableDemo = [
        {
            firstName: 'דוד',
            lastName: 'לוי',
            ID: '554930982',
            phone: '058-4365783',
            tel: '08-9876254',
            email: 'ftis@walla.com',
            password: '0000'
        }, {
            firstName: 'יוסי',
            lastName: 'כהן',
            ID: '982756300',
            phone: '058-9834711',
            tel: '08-0918273',
            email: 'yosicohen@gmail.com',
            password: '43523523'
        }, {
            firstName: 'אהובה',
            lastName: 'ישראלי',
            ID: '009827465',
            phone: '052-01019836',
            tel: null,
            email: 'aysraeli@gmail.com',
            password: '3452416'
        }, {
            firstName: 'גברי',
            lastName: 'אסייג',
            ID: '3057648333',
            phone: '057-09827645',
            tel: '08-82276443',
            email: 'gavri@net.co.il',
            password: '98213013'
        }, {
            firstName: 'מנחם',
            lastName: 'שוורץ',
            ID: '143209867',
            phone: '053-4365783',
            tel: '08-9876254',
            email: 'fgfs@walla.com',
            password: '10934123'
        }, {
            firstName: 'יהודה',
            lastName: 'עזריאלי',
            ID: '554930982',
            phone: '057-01019836',
            tel: '08-9671238',
            email: 'dfg.pf@walla.com',
            password: '23252321'
        }, {
            firstName: 'יוסף חיים',
            lastName: 'טברסקי',
            ID: '983370019',
            phone: '058-09827645',
            tel: '02-9903094',
            email: 'fsdfsa@walla.com',
            password: '0992342'
        }, {
            firstName: 'יפעת',
            lastName: 'גולן-בולצמן',
            ID: '000006711',
            phone: '052-8265437',
            tel: null,
            email: 'topqwees@walla.com',
            password: '00921321'
        }, {
            firstName: 'איגור',
            lastName: 'ינובסקי',
            ID: '000462789',
            phone: '050-0098009',
            tel: '03-5525463',
            email: 'ytrxxs@walla.com',
            password: '12421233'
        }, {
            firstName: 'הדר',
            lastName: 'אוחנה',
            ID: '833098571',
            phone: '052-1198276',
            tel: null,
            email: '345er@walla.com',
            password: '234234'
        }
    ]

    function addLoaderCursor (selector) {
        $(selector).css('cursor', 'progress !important');
    }

    function removeCursor(selector) {
        $(selector).css('cursor', '');
    }

    function ajaxReq(url, data, callbak, error) {
        addLoaderCursor('*');
        var xhr = new XMLHttpRequest();
        xhr.open('POST', APIUrl + url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.withCredentials = true;
        xhr.addEventListener('load', function (evt) {
            removeCursor('*');
            if (evt.target.status === 200) {
                callbak(JSON.parse(evt.target.response));
            } else {
                console.error(evt.target.response);
                goToScreen(p.error);
            }
        });
        xhr.addEventListener('error', error || function (error) {
            removeCursor('*');
            console.error(error);
            goToScreen(p.error);
        });
        xhr.send(JSON.stringify(data));

        //$.ajax({
        //    url: APIUrl + url,
        //    data: data,
        //    dataType: "json",
        //    type: "post",
        //    success: callbak,
        //    error: error || function () {
        //        goToScreen(p.error);
        //    }
        //})
    }

    var curScreen = null;

    var resolveObj = {
        area: function (res) {
            if (res.user) {
                s.logout.show('slow');

                if (res.user.isAdmin) {
                    goToScreen(p.manageArea);
                    if (!debug) {
                        ajaxReq(p.manageArea.getTableRows, null, setTable);
                    } else {
                        setTable(tableDemo);
                    }
                } else {
                    s.sections.userArea.find('h1 span b').text(res.user.firstName ? " " + res.user.firstName : "");
                    var text;

                    if (res.user.award == null || res.user.award == undefined) {
                        text = 'נכון להיום, טרם התקבלו תוצאות.';
                    } else if (res.user.award == 0) {
                        text = 'לצערנו סך השאלות ספריך בשנת 2015 לא הגיע לרף המינימאלי הדרוש לקבלת זכאות לתשלומים ממשרד התרבות.';
                    } else {
                        text = 'אנו שמחים לבשרך שנמצאת זכאי לקבלת תשלומי סופרים בסך ' + res.user.award + ' ₪ על השאלות ספריך בספריות הציבוריות בשנת 2015.';
                        s.sections.userArea.find('p').show();
                    }

                    s.sections.userArea.find('h3').text(text);

                    s.sections.userArea.find('#firstName').val(res.user.firstName);
                    s.sections.userArea.find('#lastName').val(res.user.lastName);
                    s.sections.userArea.find('#id').val(res.user.ID);
                    s.sections.userArea.find('#password').val(res.user.password);
                    s.sections.userArea.find('#phone').val(res.user.phone);
                    s.sections.userArea.find('#tel').val(res.user.tel);
                    s.sections.userArea.find('#email').val(res.user.email);
                    initResponsiveElements();
                    goToScreen(p.userArea);
                }
            } else if (res.wrongPassword) {
                throwAlert(s.sections.password.find('h5'), 'הסיסמא שגויה. נסה שוב.');
                s.val[2].password.focus();
            } else {
                goToScreen(p.id);
            }
        }
    };

    function asInt(str) {
        return parseInt(str.replace('px', ''));
    }

    function centerizeElement(child, parent, horizontalAlign, verticlAlign, horizontalOffset, verticalOffset) {

        if (horizontalAlign) {
            var p_marginRight = asInt(parent.css('margin-right'));
            var p_marginLeft = asInt(parent.css('margin-left'));
            var c_marginRight = asInt(child.css('margin-right'));
            var c_marginLeft = asInt(child.css('margin-left'));

            child.css('left', (parent.width() + (isNaN(p_marginRight) ? 0 : p_marginRight) + (isNaN(p_marginLeft) ? 0 : p_marginLeft) -
                                child.width() - (isNaN(c_marginRight) ? 0 : c_marginRight) - (isNaN(c_marginLeft) ? 0 : c_marginLeft) + (horizontalOffset || 0)) / 2);
        }

        if (verticlAlign) {
            var p_marginTop = asInt(parent.css('margin-top'));
            var p_marginBottom = asInt(parent.css('margin-bottom'));
            var c_marginTop = asInt(child.css('margin-top'));
            var c_marginBottom = asInt(child.css('margin-bottom'));

            child.css('top', (parent.height() + (isNaN(p_marginTop) ? 0 : p_marginTop) + (isNaN(p_marginBottom) ? 0 : p_marginBottom) -
                               child.height() - (isNaN(c_marginTop) ? 0 : c_marginTop) - (isNaN(c_marginBottom) ? 0 : c_marginBottom) + (verticalOffset || 0)) / 2);
        }
    };

    function showElement(element) {
        element.css('display', 'block');

        setTimeout(function (element) {
            element.css('opacity', 1);
        }, 0, element);
    };

    function hideElement(element) {
        element.css('opacity', '');

        setTimeout(function (element) {
            element.css('display', '');
        }, 1100, element);
    };

    function getSectionByIndex(index) {
        var i = 0;

        for (var section in s.sections) {

            if (index == i++) {
                return s.sections[section];
            }
        }
    };

    function goToScreen(index, curImportant) {
        if (curScreen != null || curImportant) {
            hideElement(getSectionByIndex(curImportant || curScreen));
        }
        curScreen = index;
        showElement(getSectionByIndex(curScreen));
        if ([6, 7].indexOf(curScreen) == -1) {
            $(getSectionByIndex(curScreen).find('input')[0]).focus();
        }
    }

    function initResponsiveElements() {
        // Init body height
        s.container.css('height', window.innerHeight);

        // Centerize & hidden sections
        for (var section in s.sections) {
            centerizeElement(s.sections[section], s.container, false, true);
        }
    }

    function addZeros(num) {
        var num = num.toString();
        var len = num.length;

        for (var i = 0; i < 9 - len; i++) {
            num = 0 + num;
        }

        return num;
    }

    function throwNewPassword(hasPassword) {
        s.sections.password.find('h4')
                            .text('סיסמא חדשה נשלחה אליך ל' + hasPassword + '.')
                            .show('slow');
        s.btn[2].reset.removeClass('success');
    }

    function throwAlert(element, message, timeout) {
        element.text(message).show('slow');

        setTimeout(function () {
            element.hide('slow');
        }, timeout || 2000);
    }

    function downloadDemoFile(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    function downloadFile(action) {
        if (debug) {
            downloadDemoFile('example.xlsx', '');
        } else {
            var f = document.createElement("form");
            f.setAttribute('method', "post");
            f.setAttribute('action', action);

            var s = document.createElement("input"); //input element, Submit button
            s.setAttribute('type', "submit");
            s.setAttribute('value', "Submit");
            f.appendChild(s);

            f.style.display = 'none';
            document.getElementsByTagName('body')[0].appendChild(f);
            f.submit();
            document.getElementsByTagName('body')[0].removeChild(f);
        }
    }


    function uploadFile() {
        s.uploadFile.trigger('click');
    }

    function readFile() {
        var file = s.uploadFile.prop('files')[0];
        if (file) {
            var reader = new FileReader();

            reader.onloadend = function (evt) {
                if (debug) {
                    throwAlert(s.sections.manageArea.find('h4'), 'הקובץ הועלה בהצלחה!');
                } else if (evt.target.readyState == FileReader.DONE) {
                    $.post(config.manage.upload, { file: evt.target.result },
                    function (res) {
                        // if OK
                        if (res.message.toLowerCase() == 'success') {
                            throwAlert(s.sections.manageArea.find('h4'), 'הקובץ הועלה בהצלחה!');
                        } else {
                            throwAlert(s.sections.manageArea.find('h4'), 'העלאת הקובץ נכשלה.');
                        }
                    },
                    function (data) {
                        // if error
                        throwAlert(s.sections.manageArea.find('h4'), 'העלאת הקובץ נכשלה.');
                    });
                }
            };

            reader.readAsText(file);
        }
    }

    function loadMessages() {
        function resolve(res) {
            var msg = "";

            for (var x = 0; x < 40; x++) {
                for (var i in res) {
                    msg += res[i].text + "    |    ";
                }
            }

            var modal = $('#messagesModal .modal-body');

            for (var i in res) {
                modal.append("<div><b>" + (parseInt(i) + 1) + "</b> | " + res[i].text + "</div>");
                if (i != res.length - 1) {
                    modal.append('<br/>');
                }
            }

            s.messages.text(msg);

            s.messages.fadeIn({ duration: 10000 });

            setInterval(function () {
                var right = (asInt(s.messages.css('right')) + 1) || -(s.messages.text().length);
                s.messages.css('right', right + 1);
            }, 40);
        }

        if (!debug) {
            ajaxReq(config.messages, null, resolve);
        } else {
            resolve(messageDemo)
        }
    }

    function translateSendPasswordTo(text) {
        switch (text) {
            case ('email'): return 'מייל';
            case ('sms'): return 'נייד';
            default: return text;
        }
    }

    function setTable(table) {
        var tbody = $('tbody[type="tableContent"]');

        for (var i in table) {
            tbody.append('<tr type="trTemplate">' +
                            '<td type="firstName"><input value="' + table[i].firstName + '"/></td>' +
                            '<td type="lastName"><input value="' + table[i].lastName + '"/></td>' +
                            '<td type="id"><input value="' + table[i].ID + '" disabled /></td>' +
                            '<td type="password"><input type="password" disabled value="0000000"/></td>' +
                            '<td type="phone"><input value="' + (table[i].phone || '') + '"/></td>' +
                            '<td type="tel"><input value="' + (table[i].tel || '') + '"/></td>' +
                            '<td type="email"><input value="' + (table[i].email || '') + '"/></td>' +
                            '<td type="save" onclick="saveData(event)"><span class="glyphicon glyphicon-saved"></span></td>' +
                         '</tr>'
                );
        }

        initResponsiveElements();

        $("td input").on("focus", function (event) {
            $(event.currentTarget).select();
        });
    };

    saveData = function(event) {
        function resolve(res) {
            if (res.isSaved) {
                var row = $('input[value="' + res.ID + '"]').parents('tr');
                row.hide('slow');
                setTimeout(row.remove, 2000);
            }
        }

        var row = $(event.currentTarget).parent();

        var data = {
            firstName: row.find('[type="firstName"] input').val(),
            lastName: row.find('[type="lastName"] input').val(),
            //password: row.find('[type="password"] input').val(),
            ID: row.find('[type="id"] input').val(),
            phone: row.find('[type="phone"] input').val(),
            tel: row.find('[type="tel"] input').val(),
            email: row.find('[type="email"] input').val()
        }

        if (!debug) {
            ajaxReq(config.manage.tableRow, data, resolve);
        } else {
            resolve({ isSaved: true, ID: data.ID });
        }
    }

    $('#saveUserAreaData').on('click', function (event) {
        function resolve(res) {
            throwAlert(s.sections.userArea.find('h4'), 'נתוניך העדכניים נשמרו בהצלחה.');
        }

        var row = s.sections.userArea.find('tr');

        var data = {
            ID: row.find('#id').val(),
            firstName: row.find('#firstName').val(),
            lastName: row.find('#lastName').val(),
            password: row.find('#password').val(),
            phone: row.find('#phone').val(),
            tel: row.find('#tel').val(),
            email: row.find('#email').val()
        }

        if (!debug) {
            ajaxReq(config.userArea, data, resolve);
        } else {
            resolve({ isSaved: true, userId: data.userId });
        }
    });

    (function () {
        initResponsiveElements();

        setTimeout(initResponsiveElements, 0);

        goToScreen(debugStartScreen || p.welcom);

        // CONFIRM - 0
        setTimeout(function () {

            if (!debug) {
                ajaxReq(config.authentication, null, resolveObj.area);
            } else {
                setTimeout(function () {
                    if (debugStartScreen == 0) goToScreen(p.id);
                }, 2000);
            }

        }, 2000);


        loadMessages();

        // Logout
        s.logout.on("click", function (event) {
            var resolve = function () {
                goToScreen(p.id);
            }

            ajaxReq(config.logout, null, resolve);
        });

        // Input auto focus
        $("input").on("focus", function (event) {
            $(event.currentTarget).select();
        });

        // Enter for confirm
        $("input").on("keyup", function (event) {
            if (event.key == 'Enter') {
                $('[index="' + curScreen + '"] button[to="confirm"]').trigger('click');
            }
        });

        // Inputs validate numeric
        $('input.id, input[type="tel"]').on("keypress", function (event) {
            if (!/^[0-9]*$/gm.test(event.key)) {
                event.preventDefault();
            };
        });

        $('input.id').on('keyup', function (event) {
            //$('input.id').val(event.currentTarget.value);
        });

        // #Id Inputs success input
        s.val[1].id.on("keyup", function () {
            if (s.val[1].id.val().length >= 4) {
                s.btn[1].confirm.addClass('success');
            } else {
                s.btn[1].confirm.removeClass('success');
            }
        });

        // #Password Inputs success input
        s.val[2].password.on("keyup", function () {
            if (s.val[2].password.val().length >= 1) {
                s.btn[2].confirm.addClass('success');
            } else {
                s.btn[2].confirm.removeClass('success');
            }
        });

        // #userNotExist Inputs success input
        s.sections.userNotExist.find('input').on("keyup", function () {
            var id = s.val[1].id.val();
            var firstName = s.val[3].firstName.val();
            var lastName = s.val[3].lastName.val();
            var email = s.val[3].email.val();
            var phone = s.val[3].phone.val();
            var tel = s.val[3].tel.val();

            if (id.length >= 4 && firstName && lastName && email && (tel.length > 8 || phone.length > 8)) {
                s.btn[3].confirm.addClass('success');
            } else {
                s.btn[3].confirm.removeClass('success');
            }
        });

        // #noDetails Inputs success input
        s.sections.noDetails.find('input').on("keyup", function () {
            var id = s.val[1].id.val();
            var firstName = s.val[5].firstName.val();
            var lastName = s.val[5].lastName.val();
            var email = s.val[5].email.val();
            var phone = s.val[5].phone.val();
            var tel = s.val[5].tel.val();

            if (id.length >= 4 && firstName && lastName && email && (tel.length > 8 || phone.length > 8)) {
                s.btn[5].confirm.addClass('success');
            } else {
                s.btn[5].confirm.removeClass('success');
            }
        });

        s.btn[1].confirm.on("click", function () {
            function resolve(res) {
                var screen = p.password;

                if (res.userExist) {
                    if (!res.hasPassword && !res.passwordSend) {
                        screen = p.noDetails;
                    } else if (!res.hasPassword && res.passwordSend) {
                        setTimeout(throwNewPassword, 750, translateSendPasswordTo(res.sendPasswordTo));;
                        screen = p.password;
                    }
                } else {
                    screen = p.userNotExist;
                }

                goToScreen(screen);
            }

            // CONFIRM - 1
            if (s.btn[1].confirm.hasClass('success')) {
                if (!debug) {
                    var data = {
                        ID: addZeros(s.val[1].id.val())
                    }

                    ajaxReq(config.id, data, resolve);
                } else {
                    // !!! Present
                    switch (s.val[1].id.val()) {
                        case ('1111'): resolve({ userExist: true, passwordSend: false, hasPassword: true }); break;
                        case ('999999999'): resolve({ userExist: true, passwordSend: false, hasPassword: true }); break;
                        case ('2222'): resolve({ userExist: true, passwordSend: true, hasPassword: false, sendPasswordTo: 'sms' }); break;
                        case ('3333'): resolve({ userExist: true, passwordSend: true, hasPassword: false, sendPasswordTo: 'email' }); break;
                        case ('4444'): resolve({ userExist: true, passwordSend: false, hasPassword: true }); break;
                        default: resolve({ userExist: false, passwordSend: false, hasPassword: false });
                    }
                }
            } else {
                throwAlert(s.sections.id.find('h5'), 'קלט לא תקין. נסה שוב.');
                s.val[1].id.focus();
            };
        });

        s.btn[2].confirm.on("click", function () {

            if (s.btn[2].confirm.hasClass('success')) {
                if (!debug) {
                    var data = {
                        ID: addZeros(s.val[1].id.val()),
                        password: s.val[2].password.val()
                    }

                    ajaxReq(config.password.confirm, data, resolveObj.area);
                } else {
                    // !!! Present
                    if (s.val[2].password.val() == '0000') {
                        switch (s.val[1].id.val()) {
                            case ('1111'): resolveObj.area({ user: { isAdmin: true } }); break;
                            default: resolveObj.area({ user: { isAdmin: false, firstName: 'דוד', lastName: 'כהן', ID: '000332321', password: '0000', tel: '02-9964754', phone: '058-2345398', email: 'davidcohen@gmail.com', award: 4651.8 } });
                        }
                    } else {
                        resolveObj.area({ wrongPassword: false });
                    }
                }
            } else {
                throwAlert(s.sections.password.find('h5'), 'קלט לא תקין. נסה שוב.');
                s.val[2].password.focus();
            };
        });

        s.btn[2].reset.on("click", function () {
            function resolve(res) {
                if (res.user && res.user.passwordSend) {
                    throwNewPassword(translateSendPasswordTo(res.sendPasswordTo));
                } else {
                    goToScreen(p.error);
                }
            }

            if (s.btn[2].reset.hasClass('success')) {
                if (!debug) {
                    var data = {
                        ID: addZeros(s.val[1].id.val())
                    }

                    ajaxReq(config.password.reset, data, resolve);
                } else {
                    // !!! Present
                    resolve({ isReset: true, hasPassword: 'מייל' });
                }
            } else {
                throwAlert(s.sections.password.find('h5'), 'לא ניתן לאפס את הסיסמא.');
                s.val[2].password.focus();
            };
        });

        s.btn[3].tryAgain.on('click', function () {
            goToScreen(p.id);
        });

        s.btn[3].confirm.on('click', function () {
            function resolve(res) {
                if (res.isLeggalDetails) {
                    goToScreen(p.thanksForDetails);
                } else {
                    goToScreen(p.error);
                }
            }

            if (s.btn[3].confirm.hasClass('success')) {
                if (!debug) {
                    var data = {
                        ID: addZeros(s.val[1].id.val()),
                        firstName: s.val[3].firstName.val(),
                        lastName: s.val[3].lastName.val(),
                        email: s.val[3].email.val(),
                        phone: s.val[3].phone.val(),
                        tel: s.val[3].tel.val(),
                    }

                    ajaxReq(config.userNotExist, data, resolve);
                } else {
                    // !!! Present
                    resolve({ isLeggalDetails: true });
                }
            } else {
                throwAlert(s.sections.userNotExist.find('h5'), 'קלט לא תקין. נסה שוב.');
                s.val[3].firstName.focus();
            }
        });

        s.btn[5].confirm.on('click', function () {
            function resolve(res) {
                if (res.isLeggalDetails) {
                    goToScreen(p.thanksForDetails);
                } else {
                    goToScreen(p.error);
                }
            }

            if (s.btn[5].confirm.hasClass('success')) {
                if (!debug) {
                    var data = {
                        ID: addZeros(s.val[1].id.val()),
                        firstName: s.val[5].firstName.val(),
                        lastName: s.val[5].lastName.val(),
                        email: s.val[5].email.val(),
                        phone: s.val[5].phone.val(),
                        tel: s.val[5].tel.val(),
                    }

                    ajaxReq(config.noDetails, data, resolve);
                } else {
                    // !!! Present
                    resolve({ isLeggalDetails: true });
                }
            } else {
                throwAlert(s.sections.noDetails.find('h5'), 'קלט לא תקין. נסה שוב.');
                s.val[5].firstName.focus();
            }
        });

        s.btn[7].upload.on('click', function () {
            uploadFile();
        });

        s.btn[7].download.on('click', function () {
            downloadFile(config.manage.download);
        });

        s.val[7].download.on('change', function () {
            if (s.uploadFile.prop('files')[0].name.split('.').pop().toLowerCase() != 'csv') {
                throwAlert(s.sections.manageArea.find('h4'), 'ניתן להעלות קבצים בעלי סיומת csv בלבד.');
                s.uploadFile.prop('files', '');
            } else {
                readFile();
            }
        });

        // Init responsive elements on window resize
        $(window).resize(function () {
            initResponsiveElements();
        });
    })();
});
