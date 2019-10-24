package handler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.authz.UnauthorizedException;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;


/*public class MyExceptionResolver implements HandlerExceptionResolver{

	   public ModelAndView resolveException(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e)
	   {

	        if(e instanceof UnauthorizedException){
	            ModelAndView mv = new ModelAndView("success");
	            return mv;
	        }
	        return null;

	    }
}*/

public class MyExceptionResolver{

	  
}
