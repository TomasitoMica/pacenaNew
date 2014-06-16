function getStringFecha(fecha)
{
	//2014-05-28 19:04:39
	var aux = fecha.split(' ');
	var date = aux[0];
	var hour = aux[1];
	
	var auxHora = hour.split(':');	
	var hourOutSeconds = auxHora[0] +':'+ auxHora[1];
	
	var auxFecha = date.split('-');
	var day = auxFecha[2];
	var mesNumber = auxFecha[1];
	var anio = auxFecha[0];
	var mesString;
	
	switch(mesNumber)
	{
		case '01':
			mesString = 'Enero';
		break;
		case '02':
			mesString = 'Febrero';
		break;
		case '03':
			mesString = 'Marzo';
		break;
		case '04':
			mesString = 'Abril';
		break;
		case '05':
			mesString = 'Mayo';
		break;
		case '06':
			mesString = 'Junio';
		break;	
		case '07':
			mesString = 'Julio';
		break;
		case '08':
			mesString = 'Agosto';
		break;
		case '09':
			mesString = 'Setiembre';
		break;
		case '10':
			mesString = 'Octubre';
		break;
		case '11':
			mesString = 'Noviembre';
		break;
		case '12':
			mesString = 'Diciembre';
		break;																			
	}	
	
	return (day +' '+mesString+' '+hourOutSeconds+' Hrs.');
}