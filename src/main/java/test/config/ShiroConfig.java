package test.config;

import java.util.LinkedHashMap;
import java.util.Map;

import org.apache.commons.collections.map.LinkedMap;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import at.pollux.thymeleaf.shiro.dialect.ShiroDialect;
import test.realm.UserRealm;


@Configuration
public class ShiroConfig {
	/**
	 * 创建ShiroFilterFactoryBean
	 */
	@Bean
	public ShiroFilterFactoryBean getShiroFilterFactoryBean(@Qualifier("securityManager")DefaultWebSecurityManager securityManager)
	{
		ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean();
		shiroFilterFactoryBean.setSecurityManager(securityManager);
		//添加Shiro内置过滤器
				/**
				 * Shiro内置过滤器，可以实现权限相关的拦截器
				 *    常用的过滤器：
				 *       anon: 无需认证（登录）可以访问
				 *       authc: 必须认证才可以访问
				 *       user: 如果使用rememberMe的功能可以直接访问
				 *       perms： 该资源必须得到资源权限才可以访问
				 *       role: 该资源必须得到角色权限才可以访问
				 */
		Map<String, String>  filterMap = new LinkedHashMap<String, String>();
		filterMap.put("/login", "anon");
		filterMap.put("/*", "authc");
		shiroFilterFactoryBean.setUnauthorizedUrl("/noAccess");
		shiroFilterFactoryBean.setSuccessUrl("/loginSuccess");
		shiroFilterFactoryBean.setLoginUrl("/login");
		shiroFilterFactoryBean.setFilterChainDefinitionMap(filterMap);
		return shiroFilterFactoryBean;
	}
	
	@Bean(name="securityManager")
	/**
	 * 创建DefaultWebSecurityManager
	 */
	public DefaultWebSecurityManager getDefaultWebSecurityManager(@Qualifier("userRealm")UserRealm userRealm)
	{
		DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
		//关联realm
		securityManager.setRealm(userRealm);
		return securityManager;	
	}

	/**
	 * 创建Realm
	 */
	@Bean(name="userRealm")
	public UserRealm getRealm()
	{ 
		return new UserRealm();
	}
	
	@Bean
	public ShiroDialect getShiroDialect(){
		return new ShiroDialect();
	}

}
