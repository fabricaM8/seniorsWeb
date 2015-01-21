package org.seniors.util;

import static org.seniors.util.ValidationUtils.isNotNullAndEmpty;

import java.util.Calendar;
import java.util.Date;

/**
 * Date utility class.
 * @author <a hre="mailto:juliosugaya@gmail.com">Julio Sugaya</a>
 */
public class DateUtils {

	
	/**
	 * Converts a String in a Date {@link Date}
	 * @param strDate
	 * @return A Data convertida
	 */
	public static Date stringToDate(String strDate){
		
		Date date = null;
		
		if(isNotNullAndEmpty(strDate)){
			
			Calendar calendar = Calendar.getInstance();
			
			int year  = Integer.parseInt(strDate.substring(0,4));
			int month = Integer.parseInt(strDate.substring(4,6));
			int day   = Integer.parseInt(strDate.substring(6));
			
			calendar.set(Calendar.YEAR, year);
			calendar.set(Calendar.MONTH, month-1);
			calendar.set(Calendar.DATE, day);
			calendar.set(Calendar.HOUR, 0);
			calendar.set(Calendar.MINUTE, 0);
			calendar.set(Calendar.SECOND, 0);
			
			date = new Date(calendar.getTimeInMillis());
		}
		
		return date;
	}
}