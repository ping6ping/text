package test.domain;

public class User {

	private String login_name;
	
	private String password;
	
	private String id;

	public String getName() {
		return login_name;
	}

	public void setName(String login_name) {
		this.login_name = login_name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	
}
