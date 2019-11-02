package test.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.impl.persistence.entity.ExecutionEntity;
import org.activiti.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import test.service.ActivityService;

@Service
public class ActivityServiceImpl implements ActivityService {

	@Autowired
	private RuntimeService runtimeService;
	@Autowired
	private TaskService taskService;
	//private final Logger logger = LoggerFactory.getLogger(getClass());
	
	@Override
	public boolean startActivity() {
		/*logger.info("工作流启动....");*/
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("apply", "zhangsan");
		map.put("approve", "lisi");
		
		ExecutionEntity pi1 = (ExecutionEntity) runtimeService.startProcessInstanceByKey("leave2", map);
		String processId = pi1.getId();
		Task task = taskService.createTaskQuery().processInstanceId(processId).singleResult();
		taskService.complete(task.getId(), map);
		
		task = taskService.createTaskQuery().processInstanceId(processId).singleResult();
		String taskId2 = task.getId();
		map.put("pass", false);
		taskService.complete(taskId2, map);
		
		task = taskService.createTaskQuery().processInstanceId(processId).singleResult();
		return false;
	}
	
	//开始流程，传入申请者的id以及公司的id
	public void startProcess( Long personId, Long compId){
		Map<String, Object> variables = new HashMap<String, Object>();
		variables.put("personId", personId);
		variables.put("compId", compId);
		runtimeService.startProcessInstanceByKey("joinProcess", variables);
		}
	
	//获得某个人的任务别表
	public List<Task> getTasks(String assignee) {
		return taskService.createTaskQuery().taskCandidateUser(assignee).list();
	}
	
	 //完成任务
	public void completeTasks(Boolean joinApproved, String taskId)
	{
		Map<String, Object> taskVariables = new HashMap<String, Object>();
		taskVariables.put("joinApproved", joinApproved);
		taskService.complete(taskId, taskVariables);
	}
	
}
