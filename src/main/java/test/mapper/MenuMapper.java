package test.mapper;

import java.util.HashMap;
import java.util.List;

import test.domain.Menu;


public interface MenuMapper {

	public List<Menu> getMenuList(HashMap<String, String> map);
}
