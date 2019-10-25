package test.domain;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;



public class ShiroUtils {
	public static Subject getSubjct()
    {
        return SecurityUtils.getSubject();
    }

    public static void logout()
    {
        getSubjct().logout();
    }

    public static User getSysUser()
    {
        return (User) getSubjct().getPrincipal();
    }

    public static String getUserId()
    {
        return getSysUser().getId();
    }

    public static String getLogin_name()
    {
        return getSysUser().getLogin_name();
    }

    public static String getSessionId()
    {
        return String.valueOf(getSubjct().getSession().getId());
    }
}
