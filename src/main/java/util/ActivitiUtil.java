package util;

import java.lang.reflect.Field;
import java.util.List;

import org.activiti.engine.history.HistoricVariableInstance;

public class ActivitiUtil {
	 public static <T> void setVars(T entity, List<HistoricVariableInstance> varInstanceList)
	 {
		 Class<?> tClass = entity.getClass();
		 try {
	            for (HistoricVariableInstance varInstance : varInstanceList) {
	                Field field = tClass.getDeclaredField(varInstance.getVariableName());
	                if (field == null) {
	                    continue;
	                }
	                field.setAccessible(true);
	                field.set(entity, varInstance.getValue());
	            }
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	    }
	 }
