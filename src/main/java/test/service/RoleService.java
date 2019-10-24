package test.service;

import java.util.List;

import test.domain.Role;

public interface RoleService {

	public List<Role> findRoleListByName(String name);
}
