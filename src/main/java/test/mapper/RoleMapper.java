package test.mapper;

import java.util.List;

import test.domain.Role;

public interface RoleMapper {
	public List<Role> findRoleListByName(String name);
}
