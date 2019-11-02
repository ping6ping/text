package test.domain;

import java.io.Serializable;


public class TicketInfo implements Serializable{

	private static final long serialVersionUID = 1L;
	private String id;
	private String name;
	private String msg;
	private String status;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getTaskId() {
		return taskId;
	}
	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	private String taskId;
}
