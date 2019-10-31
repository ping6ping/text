package test.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import test.domain.Menu;

import test.mapper.MenuMapper;
import test.service.MenuService;

@Service
public class MenuServiceImpl implements MenuService{

	@Autowired
	MenuMapper menuMapper;
	
	@Autowired
	MenuService menuService;
	
	@Override
	public List<Menu> getMenuList(HashMap<String, String> map) {
		
		List<Menu> firstMenus = menuMapper.getMenuList(map);
		// TODO Auto-generated method stub
		return firstMenus;
	}

	@Override
	public  List<Menu> getAllChildMenu(List<Menu> menus) {
		// TODO Auto-generated method stub
		
		List<Menu> returnList = new ArrayList<Menu>();
		for (Iterator<Menu> iterator = menus.iterator(); iterator.hasNext();)
		{
			  Menu menu = (Menu) iterator.next();
			  List<Menu> childMenuList = getChildMenu(menu);
			  if(childMenuList.size()>0)
			  {
				  List<Menu> menuChildList = new ArrayList<Menu>();
				  menuChildList.add(menu);
				  menu.setChildren(menuService.getAllChildMenu(menuChildList)); 
			  }
			  returnList.add(menu);
		}
		
		return returnList;
	}	
	
	public  List<Menu> getChildMenu(Menu menus)
	{
		return menuMapper.getChildMenu(menus.getMenu_id());
	}

}
