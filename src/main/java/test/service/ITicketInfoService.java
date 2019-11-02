package test.service;

import java.util.List;

import test.domain.TicketInfo;

public interface ITicketInfoService {
	/**
	 * 新增请假单
	 * 
	 * @param info
	 */
	public String addTicketInfo(String msg);

	/**
	 * 查询用户待办任务
	 * 
	 * @param userId
	 * @return
	 */
	public List<TicketInfo> queryTicketInfo(String userId);

	/**
	 * 完成任务
	 * @param taskId
	 * @param userId
	 * @param audit
	 * @param comment
	 * @return
	 */
	public String complete(String taskId, String userId, String audit, String comment);
}
