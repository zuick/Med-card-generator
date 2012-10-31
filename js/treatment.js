$(document).ready(function(){
    var treatment_count = 0; 
    $('#add-treat').before( '<select class="lek">' + get_diseases() + '</select>' );
    
    $('#add-treat').click( function(){
	$('table.lechenie tbody').html( $('table.lechenie tbody').html() + get_treatment_item( $('select.lek').val() ) );
	treatment_count++;
    });
    $('input.del-treat').live( 'click', function(){
	$(this).parents("td").detach();
    });
    
});
function get_treatment_item( dis_name ){
    var row_html = '<tr>';
    row_html += '<td>';
    row_html += treatment_table_html( dis_name );
    row_html += '<div class="right"><input class="del-treat" type="button" value="Удалить"/></div>';
    row_html += '</td></tr>';
    return row_html;
}
function get_diseases(){
    var html = '';
    for( i in deseases ){
	html += '<option>' + deseases[i]["name"] + '</options>';
    }
    return html; 
}

function get_disease( dis_name ){
    for( i in deseases ){
	if( deseases[i]["name"] == dis_name ){
	    return deseases[i];
	}
    }
    return false;
    
}
function get_treatment_string( dis_name ){
    var dis = get_disease( dis_name );
    var treatment = '';
    for( var i = 0; i < dis["medicine"].length - 1; i++ ){
	treatment += dis["medicine"][i] + ', ';
    }
    treatment += dis["medicine"][dis["medicine"].length - 1];
    return treatment;
}

function treatment_table_html( dis_name ){
    var dis = get_disease( dis_name );
    var html = '<div class="treat_table_wrapper">';
    html += '<div class="table_name">' + dis_name + '</div>';
    html += '<table><tbody>';
    html += '<tr><td>Лекарство</td><td>Доза</td><td>Период</td><td>Коментарий</td></tr>';
    for( i in dis["medicine"] ){
	html += '<tr>';
	html += '<td>' + dis["medicine"][i] + '</td>';
	html += '<td><input type="text" class="middle"></td>';
	html += '<td><input type="text" class="middle"></td>';
	html += '<td><input type="text" class="middle"></td>';
	html += '</tr>';
    }
    html += '</tbody></table><div>';
    return html;
}


