package test.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import test.domain.User;
import test.mapper.UserMapper;
import test.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private  UserMapper userMapper;
	public User findByName(String name) {
		// TODO Auto-generated method stub
		return userMapper.findByName(name);
	}
	@Override
	public User getUser(User user) {
		// TODO Auto-generated method stub
		return userMapper.getUser(user);
	}

}
