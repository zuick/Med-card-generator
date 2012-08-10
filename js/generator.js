$(document).ready(function(){
	generate();
	initialization();
});

function initialization(){
	// добавить тестовое поле "Другое"
	$('.param-box table select').each(function(){
		if( this.id != 'state-level' ){
			add_custom_input( this );
		}
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
}

function add_custom_input( field_id ){
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
	$('#' + field_id + '-p').html( '<pre>' + field_name + separator + '</pre>' + addition);
}

function fill_from_double_select( id_main, id_second, field_name, separator ){
	var addition = '';
	addition = ( custom_input_empty( id_main ) ) ? ($('#' + id_main).val() + ', ' + $('#' + id_second).val()) : get_custom_input_val( id_main );
	
	$('#' + id_main + '-p').html( '<pre>' + field_name + separator + '</pre>' + addition );
}

function fill_from_input( field_id, field_name, separator ){
	fill_from_select( field_id, field_name, separator );
}

function fill_from_radiobutton( field_id, field_name ){
	$('#' + field_id + '-p').text($(':radio[name=' + field_id + ']').filter(":checked").val());
}

// генерация текста справки
function generate(){
	fill_from_radiobutton( 'type', '' );
	fill_from_input( 'date', '', '');
	fill_from_input( 'temp', 'Темп', ':');
	fill_from_input( 'chd', 'ЧД', ':');
	fill_from_input( 'chss', 'ЧСС', ':');
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
	fill_from_checkboxes('limf', 'Лимфотические узлы', ':');
	fill_from_checkboxes('nosd', 'Носовое дыхание', ':');	

	if($('input[name=zdorov]').prop('checked'))
		$('#yavka-p').text('');
	else
		fill_from_input( 'yavka', 'Явка', ':');	

}