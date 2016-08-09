; define(function (require, exports, module) {
    function createModal(id, tableId, title, heads, width) {
        var tempate = '';
        tempate += ' <div id="' + id + '" class="modal fade" role="dialog" aria-labelledby="' + id + 'Label" aria-hidden="true">';
        tempate += '   <div class="modal-dialog modal-lg" style="width: ' + width + 'px;">';
        tempate += '       <div class="modal-content modal-content-mystyle">';
        tempate += '            <div class="modal-header modal-header-mystyle footerstyle">';
        tempate += '                <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="font-size: 32px; color: white; line-height: .5">';
        tempate += '                   <span aria-hidden="true">&times;</span>';
        tempate += '                </button>';
        tempate += '               <h4 class="modal-title" id="' + id + 'Label" style="text-align: center">' + title + '</h4>';
        tempate += '           </div>';
        tempate += '            <table class="table modal-body display" style="text-align: center; width: 100%; padding-bottom: 0px; color: #68717F;"';
        tempate += 'id="' + tableId + '">';
        tempate += '<thead>';
        tempate += '  <tr style="width: 100%; text-align: center;">';
        //头
        var headLen = heads.length;
        for (var i = 0; i < headLen; i++) {
            tempate += ' <th  style="text-align: center;">' + heads[i] + '</th>';
        }
        tempate += '   </tr>';
        tempate += ' </thead>';
        tempate += '  </table>';
        tempate += '</div>';
        tempate += '</div>';
        tempate += '</div>';
        $(document.body).find("#" + id).remove();
        $(document.body).append(tempate);
    }

    module.exports = createModal;

});