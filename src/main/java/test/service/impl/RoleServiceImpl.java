package test.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import test.domain.Role;
import test.mapper.RoleMapper;
import test.service.RoleService;

@Service
public class RoleServiceImpl implements RoleService {
    
	@Autowired
	private RoleMapper roleMapper;
	
	@Override
	public List<Role> findRoleListByName(String name) {
		// TODO Auto-generated method stub
		return  roleMapper.findRoleListByName(name);
	}

}
