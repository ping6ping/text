package test.mapper;

import test.domain.User;

public interface  UserMapper {

	public User findByName(String name);
	
	public User getUser(User user);
}
