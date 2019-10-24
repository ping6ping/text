package test.realm;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;

import test.domain.Role;
import test.domain.User;
import test.service.RoleService;
import test.service.UserService;

public class UserRealm extends AuthorizingRealm{

	
	

	@Autowired
	private UserService  userService;
	
	@Autowired
	private RoleService roleServie;
	/**
	 * 执行授权逻辑
	 */
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		String loginName =(String) principals.getPrimaryPrincipal();
		
		//User loginName1 = (User)SecurityUtils.getSubject().getPrincipal();
		SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
		
		List<String> roles = new ArrayList<String>();
		//Set<String> userPermissions = new HashSet<String>();
		
		 for(Role role : roleServie.findRoleListByName(loginName))
		 {
			 roles.add(role.getRole());
			 
		 }
		
		 authorizationInfo.addRoles(roles);
        return  authorizationInfo;
	}

	
	/**
	 * 执行认证逻辑
	 */
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken arg0) throws AuthenticationException {
		
		
		UsernamePasswordToken  token = (UsernamePasswordToken)arg0;
		User user = new User();
		user.setName(token.getUsername());
		user.setPassword(String.valueOf(token.getPassword()));
	    userService
		
		if(!token.getUsername().equals(name))
		{
			//throw new UnknownAccountException();
			return null;
		}
		
		return new SimpleAuthenticationInfo(token.getUsername(),password,"");
		
		
	}
	
	

}
