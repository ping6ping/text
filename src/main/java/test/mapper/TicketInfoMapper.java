package test.mapper;

import test.domain.TicketInfo;

public interface TicketInfoMapper {
	/**
	 * 更新流程状态
	 * 
	 * @param execution
	 * @param status
	 * @return
	 */
	public int updateProcessStatus(TicketInfo info);
	
	/**
	 * 新增请假信息
	 * @param info
	 */
	public void addTicketInfo(TicketInfo info);
	
	/**
	 * 根据ID查询业务数据
	 * @param id
	 */
	public TicketInfo queryTicketInfoById(String id);
	
	/**
	 * 根据业务ID查询流程Id
	 * @param bizKey
	 * @return
	 */
	public String queryProcessIdByBizKey(String bizKey);
	
	/**
	 * 根据环节ID查询流程Id
	 * @param taskId
	 * @return
	 */
	public String queryProcessIdByTaskId(String taskId);
	
	/**
	 * 根据taskId查询审批意见
	 * @param taskId
	 * @return
	 */
	public String queryMessageByTaskId(String taskId);
}
