package test.domain;

import java.util.Date;

public class Vacation {

	private Integer Days;
	private String Reason;
	private String ApplyUser;
	private Date ApplyTime;

	private String ApplyStatus;

	public String getApplyUser() {
		return ApplyUser;
	}
	public void setApplyUser(String applyUser) {
		ApplyUser = applyUser;
	}
	public Integer  getDays() {
		return Days;
	}
	public void setDays(Integer days) {
		Days = days;
	}
	public String getReason() {
		return Reason;
	}
	public void setReason(String reason) {
		Reason = reason;
	}
	public Date getApplyTime() {
		return ApplyTime;
	}
	public void setApplyTime(Date applyTime) {
		ApplyTime = applyTime;
	}
	public String getApplyStatus() {
		return ApplyStatus;
	}
	public void setApplyStatus(String applyStatus) {
		ApplyStatus = applyStatus;
	}
}
