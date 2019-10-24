package test.service;

import test.domain.User;

public interface  UserService {
	
	public User findByName(String name);
	
	public User getUser(User user);

}
