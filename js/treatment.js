$(document).ready(function(){
    var treatment_count = 0; 
    $('#add-treat').click( function(){
	$('table.lechenie tbody').html( $('table.lechenie tbody').html() + get_treatment_item( treatment_count ));
	treatment_count++;
    });
    $('input.del-treat').live( 'click', function(){
	$(this).parent().parent().detach();
    });
});
function get_treatment_item( id ){
    var row_html = '<tr class="row-720" id="item-' + id + '">';
    row_html += '<td class="left"><select id="lek-' + id + '">' + get_diseases() + '</select></td>';
    row_html += '<td><label for="doza-' + id + '">Доза</label><input id="doza-' + id + '" type="text" class="middle" /></td>';
    row_html += '<td><label for="period-"' + id + '>Период</label><input id="period-' + id + '" type="text" class="middle" /></td>';
    row_html += '<td><label for="komment-"' + id + '>Комментарий</label><input id="komment-' + id + '" type="text" class="middle" /></td>';
    row_html += '<td class="right"><input class="del-treat" type="button" value="Удалить"/></td>';
    row_html += '</tr>';
    return row_html;
}
function get_diseases(){
    var html = '<option></options>';
    html += '<option></options>';
    return html; 
}


