function AGDD_errorPlacement(error,element){
    //console.log('errorPlacement',element.name)
    error.addClass('help-block');
    let parent=element.parents('div.form-group')
    let next=element.next('span')
    parent.addClass("has-feedback");
    if (element.prop("type")==="checkbox")
        error.insertAfter(element.parent("label"));
    else
    {
        let parentgroup=element.parent('div.input-group')
        if(parentgroup.length>0)
            error.insertAfter(parentgroup);
        else if(next.length>0)
            error.insertAfter(next);
        else
            error.insertAfter(element);
    }
    parent.append($("<span class='glyphicon glyphicon-remove form-control-feedback'></span>"))
}

function AGDD_success(label,element){
    //console.log('success',element.name)
    let parent=$(element).parents('div.form-group')
    parent.append($("<span class='glyphicon glyphicon-ok form-control-feedback'></span>"))
}

function AGDD_highlight(element,errorClass,validClass){
    //console.log('highlight',element.name)
    let parent=$(element).parents('div.form-group')
    parent.addClass("has-error").removeClass("has-success");
    parent.find('.glyphicon.form-control-feedback').addClass("glyphicon-remove").removeClass("glyphicon-ok");
    //$(element).next("span").addClass("glyphicon-remove").removeClass("glyphicon-ok");
}
function AGDD_unhighlight(element,errorClass,validClass){
    //console.log('unhighlight',element.name)
    let parent=$(element).parents('div.form-group')
    parent.addClass("has-success").removeClass("has-error");
    parent.find('.glyphicon.form-control-feedback').addClass("glyphicon-ok").removeClass("glyphicon-remove");
    //$(element).next("span").addClass("glyphicon-ok").removeClass("glyphicon-remove");
}