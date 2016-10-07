var _$ = function(selector){
    var method = selector.substr(0,1) == '.'? 'getElementsByClassName' : 'getElementById';
    return document[method](selector.substr(1));
};

var typesetting = function(context) {
    var bSpace = false;
    var bLine = false;
    if (context[0] == '\n'){
        context[0] = '';
    }
    for (var i in context){
        if (context[i].charCodeAt() == 12288 || context[i].charCodeAt() == 32){
            if (bSpace == true){
                context[i] = '';
            }else{
                bSpace = true
            }
        }else{
            if (bSpace == true){
                bSpace = false
            }
        }
        if (context[i] == '\n'){
            context[i] = '';
        }
    }
    return context;
};

var addTime = function(N){
    // [00:00.50]
    var Time = '[';
    var secs = 2 * N;
    var sec = secs % 60;
    var min = Math.floor(secs / 60).toString();
    min = '000'+min;
    sec = '000'+sec;
    Time += min.substring(min.length-2,min.length) + ':' + sec.substring(sec.length-2,sec.length) + '.00]';
    return Time;
};

var transfo = function() {
    var oInput = _$('#In');
    var oOutput = _$('#Out');
    var oBtn = _$('#Btn');

    // var view = oOutput.value;

    oBtn.onclick = function () {
        oOutput.value = '';
        var text = oInput.value.split("");  // Array
        var i = 0;
        var _text_ = [];
        var _view_ = "";    // String
        while (text.length) {
            _text_ = text.splice(0, 16);
            _text_ = typesetting(_text_);
            _view_ = _text_.join("");
            // view += _view_;
            // view += '\n';
            oOutput.value += addTime(i);
            oOutput.value += _view_;
            oOutput.value += '\n';
            i++;
            if (i > 600){
                i = 0;
                oOutput.value += '\n********************我是帅气的分割线********************\n\n'
            }
        }
        console.log(addTime(i));
    }
};

window.onload = function(){
    transfo();
};

// 注意：
// 1. 2秒1节，1节16个字
// 2. 不能有^13的回车，全部替换成^l


