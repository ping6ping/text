package test.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import test.domain.Menu;
import test.domain.User;
import test.mapper.MenuMapper;
import test.service.MenuService;

@Service
public class MenuServiceImpl implements MenuService{

	@Autowired
	MenuMapper menuMapper;
	
	@Override
	public List<Menu> getMenuList(HashMap<String, String> map) {
		// TODO Auto-generated method stub
		return menuMapper.getMenuList(map);
	}

}
