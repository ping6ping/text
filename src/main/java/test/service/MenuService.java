package test.service;

import java.util.HashMap;
import java.util.List;
import test.domain.Menu;

public interface MenuService {
	public List<Menu> getMenuList(HashMap<String, String> map);
}
