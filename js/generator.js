$(document).ready(function(){
	generate();
	initialization();
});

function initialization(){
	// добавить тестовое поле "Другое"
	$('.param-box table.parameters select').each(function(){
		if( this.id != 'state-level' && this.id != 'bolezn-stepen'){
			add_custom_input( this );
		}
	});
	$('.param-box table.lechenie select').each(function(){	
		add_custom_input( this );
	});
	$('.param-box table div.checkboxes').each(function(){
		add_custom_input( this );
	});
	$('input').live( 'change', function(){ generate(); });
	$('select').live( 'change', function(){ generate(); });
	$('.datepicker .today').live( 'click', function(){ generate(); });
	$('.datepicker .date').live( 'click', function(){ generate(); });
	// добавить выбор даты
	$('#date').simpleDatepicker(); 
	$('#yavka').simpleDatepicker(); 
	$('#med-otvod').simpleDatepicker(); 
}

function add_custom_input( field_id, td_tag ){
   $(field_id).parent().after('<td><input id="' + field_id.id +  '-custom" type="text" placeholder="Другое" class="custom-input" onChange="generate()"/></td>');	
}
// Проверка поля "Другое"
function custom_input_empty( field_id ){
	if( 0 == $('#' + field_id + '-custom').length ) return true;
	
	if ( '' == $('#' + field_id + '-custom').val() || null == $('#' + field_id + '-custom').val() )
		return true;
	else
		return false;
}

function get_custom_input_val( field_id ){
	return $('#' + field_id + '-custom').val();
}

// Функции заполнения превью справки
function fill_from_checkboxes( field_id, field_name, separator ){
	var p_field_id = '#' + field_id + '-p';
	
	if( custom_input_empty( field_id ) ){
		var is_first = true;
		$(p_field_id).html( '<pre>' + field_name + separator + '</pre>' );
		$('#' + field_id + ' div input').each( function() {
			if( this.checked ){
				if( is_first ){
					$(p_field_id).html( $(p_field_id).html() + $(this).val() );
					is_first = false;
				}else{
					$(p_field_id).html( $(p_field_id).html() + ', '+ $(this).val() );
				}			
			}
		});	
	}else{
		$(p_field_id).html( '<pre>' + field_name + separator + '</pre>' + get_custom_input_val( field_id ));
	}
	

}

function fill_from_select( field_id, field_name, separator ){
	var addition = '';
	addition = ( custom_input_empty( field_id ) ) ? $('#' + field_id).val() : get_custom_input_val( field_id );		
	if( '' != field_name ) 
	    $('#' + field_id + '-p').html( '<pre>' + field_name + separator + '</pre>' + addition);
	else
	    $('#' + field_id + '-p').html( addition );
}

function fill_from_double_select( id_main, id_second, field_name, separator ){
	var addition = '';
	addition = ( custom_input_empty( id_main ) ) ? ($('#' + id_main).val() + ', ' + $('#' + id_second).val()) : get_custom_input_val( id_main );
	
	if( '' != field_name )
	    $('#' + id_main + '-p').html( '<pre>' + field_name + separator + '</pre>' + addition );
	else
	    $('#' + id_main + '-p').html( addition );
	    
}

function fill_from_input( field_id, field_name, separator ){
	fill_from_select( field_id, field_name, separator );
}

function fill_from_radiobutton( field_id, field_name ){
	$('#' + field_id + '-p').text($(':radio[name=' + field_id + ']').filter(":checked").val());
}

function update_not_nes_inputs( field_id ){
    if($('input[name=' + field_id + ']').prop('checked')){
	$('#' + field_id).prop('disabled','');
    }else{
	$('#' + field_id).prop('disabled','disabled');
    }
}
function fill_not_nes_select( field_id, field_name, separator ){
    if($('input[name=' + field_id + ']').prop('checked')){
	fill_from_select( field_id, field_name, separator);
	$('#' + field_id + '-p').css( 'display', 'block');
    }else{
	$('#' + field_id + '-p').css( 'display', 'none');
    }
}
// генерация текста справки
function generate(){
    fill_from_radiobutton( 'type', '' );
    fill_from_input( 'date', '', '');
    fill_from_input( 'temp', '', '');
    fill_from_input( 'chd', '', '');
    fill_from_input( 'chss', '', '');
    fill_from_input( 'ad', '', '');
    fill_from_input( 'adres', 'Адрес', ':');
    fill_from_input( 'jalob', 'Жалобы', ':');
    fill_from_select( 'name', '', '');
    fill_from_double_select( 'state', 'state-level', 'Состояние', ':');
    fill_from_select( 'skin', 'Кожа', ':');
    fill_from_select( 'dyha', 'Дыхание', ':');
    fill_from_select( 'serd', 'Сердечные тоны', ':');
    fill_from_select( 'jivo', 'Живот', ':');
    fill_from_select( 'stul', 'Стул', ':');
    fill_from_select( 'moch', 'Мочеиспускание', ':');
    fill_from_checkboxes('zev', 'Зев', ':');
    fill_from_checkboxes('kash', 'Кашель', ':');
    fill_from_select( 'odsh', 'Одышка', ':');
    fill_from_checkboxes('limf', 'Лимфотические узлы', ':');
    fill_from_checkboxes('nosd', 'Носовое дыхание', ':');	
    fill_from_double_select( 'bolezn', 'bolezn-stepen', '', '');

    if($('input[name=reconv]').prop('checked')){
	$('#ne-zdorov').css('display', 'block');
	$('#zdorov').css('display', 'none');

	$('#reconv-p').text("Реконвалесцент. Лечение отменить.");
	
	$('#reconv-detail-p').css('display', 'block');
    }else{
	$('#ne-zdorov').css('display', 'none');
	$('#zdorov').css('display', 'block');

	$('#reconv-p').text("Лечение продлить.");
	$('#reconv-detail-p').css('display', 'none');
    }
    fill_not_nes_select( 'med-otvod', 'Мед. отвод до', '' );
    fill_not_nes_select( 'uchrejd', 'Справка в', '' );
    fill_not_nes_select( 'napravl', 'Направление', '');

    // некоторые необязательные поля
    update_not_nes_inputs('uchrejd');
    update_not_nes_inputs('napravl');
    update_not_nes_inputs('med-otvod');
}