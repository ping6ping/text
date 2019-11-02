package test.controller;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import javax.servlet.http.HttpServletRequest;

import org.activiti.engine.HistoryService;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.history.HistoricProcessInstance;
import org.activiti.engine.history.HistoricVariableInstance;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import test.domain.Menu;
import test.domain.ShiroUtils;
import test.domain.User;
import test.domain.VacTask;
import test.domain.Vacation;
import test.service.MenuService;
import test.service.UserService;
import util.ActivitiUtil;

@Controller
public class Usercontroller {
	
	private static final String PROCESS_DEFINE_KEY = "vacationProcess";
	
	@Autowired
	private UserService  userService;
	@Autowired
	private MenuService menuService;
	
	@Autowired
	private RedisTemplate<Object, Object>  redisTemplate; //泛型里面只能为<String,String>或<Object,Object>

	@Autowired  
	private RepositoryService repositoryService;
	@Autowired  
	private RuntimeService runtimeService; 
	@Autowired  
	private TaskService taskService; 
	@Autowired
	private HistoryService historyService;
	
	@GetMapping("/login")
	public String toLogin(String pp){
		
		return "login";

	}
	
	@PostMapping("/login")
	public String  login(String userName,String password,Model model,HttpServletRequest request){
		
		Subject subject = SecurityUtils.getSubject();
		UsernamePasswordToken token = new UsernamePasswordToken(userName,password);
		
		/*try {
			subject.login(token);
			return "redirect:/loginSuccess";
		} catch (UnknownAccountException  e) {
			model.addAttribute("msg","用户名不存在");
			return "Login";
		}catch (IncorrectCredentialsException  e) {
			// TODO: handle exception
			model.addAttribute("msg","密码错误");
			return "login";
		}*/
		
		return "login";
	}
	
	@RequestMapping("/loginSuccess")
	public String loginSuccess(Model model) {
		
		 User user = ShiroUtils.getSysUser();
		 HashMap<String, String> map = new HashMap<String, String>();
		 map.put("dept_id", user.getDept_id());
		 map.put("menu_type", "C");
		//获取第一层目录
		 List<Menu> menus = menuService.getMenuList(map);
		 //获取所有目录
		 List<Menu> allMenus = menuService.getAllChildMenu(menus);
		 model.addAttribute("menus", allMenus);
	     model.addAttribute("user", user);
		 return "main";
		 
	}
	
	
	
	@RequestMapping("/shouye")
	public String testShouye(String param1,String param2)
	{
		return "";
	}
	
	@RequestMapping("/noAccess")
	public String noAccess()
	{
		return "error";
	}
	
	@RequestMapping("/redis")
	@ResponseBody
	public List<User> getAllUsers() {  //牺牲了性能
		//字符串的序列化器
		RedisSerializer redisSerializer = new StringRedisSerializer();
		redisTemplate.setStringSerializer(redisSerializer);
		
		//高并发下,缓存穿透
		
		List<User> users = (List<User>)redisTemplate.opsForValue().get("allUsers");
		if(users == null)
		{
			synchronized(this)
			{
				users = (List<User>)redisTemplate.opsForValue().get("allUsers");
				if(users == null)
				{
					System.out.println("查询数据库");
					users = new ArrayList<User>();
					redisTemplate.opsForValue().getAndSet("allUsers",users );
				}
				else {
					System.out.println("查询缓存");
				}
			}
		}
		else {
			
			System.out.println("查询缓存");
		}
		return users;
	}
	
	@RequestMapping("/testRedis")
	public void testRedis() {
		ExecutorService executorService = Executors.newFixedThreadPool(25);
		
		for(int i=0;i<1000;i++)
		{
			executorService.execute(new Runnable() {
				
				@Override
				public void run() {
					// TODO Auto-generated method stub
					getAllUsers();
				}
			});
		}
	}

	@RequestMapping("/leave")
	public void firstDemo()
	{
		/*Map<String,Object> map = new HashMap<String,Object>();
		map.put("apply","zhangsan");
		map.put("approve","lisi");
		map.put("pass", false);*/
		Map<String, Object> vars = new HashMap<>(4);
		vars.put("applyUser", "zhangsan");
	    vars.put("days", 4);
	    vars.put("reason", "有事");
	    vars.put("apply","zhangsan");
	    vars.put("approve","lisi");
	    vars.put("pass", false);
		//根据bpmn文件部署流程
		Deployment deployment = repositoryService.createDeployment().addClasspathResource("processes/second.bpmn").deploy();
		//获取流程定义
		//ProcessDefinition processDefinition = repositoryService.createProcessDefinitionQuery().deploymentId(deployment.getId()).singleResult();
		//启动流程定义，返回流程实例
		//ProcessInstance pi = runtimeService.startProcessInstanceById(processDefinition.getId(),vars);
		//ProcessInstance pi = runtimeService.startProcessInstanceById("vacationProcess",vars);
		ProcessInstance pi = runtimeService.startProcessInstanceByKey("vacationProcess",vars);
		String processId = pi.getId();
		System.out.println("流程创建成功，当前流程实例ID："+processId);
		Task task=taskService.createTaskQuery().processInstanceId(processId).singleResult();
		taskService.claim(task.getId(), "lisi");
		System.out.println("第一次执行前，任务名称："+task.getName());
		taskService.complete(task.getId(),vars);
	}
	
	//查询需要自己审批的请假
	@RequestMapping("/queryLeave")
	 public Object myAudit(String userName) {
	        /*List<Task> taskList = taskService.createTaskQuery().taskCandidateUser("lisi")
	                .orderByTaskCreateTime().desc().list();*/
	        List<Task> taskList = taskService.createTaskQuery().taskAssignee("lisi").list();
	        List<VacTask> vacTaskList = new ArrayList<>();
	        for (Task task : taskList) {
	            VacTask vacTask = new VacTask();
	            vacTask.setId(task.getId());
	            vacTask.setName(task.getName());
	            vacTask.setCreateTime(task.getCreateTime());
	            String instanceId = task.getProcessInstanceId();
	            ProcessInstance instance = runtimeService.createProcessInstanceQuery().processInstanceId(instanceId).singleResult();
	            Vacation vac = getVac(instance);
	            vacTask.setVac(vac);
	            vacTaskList.add(vacTask);
	        }
	        return vacTaskList;
	    }
	 
	 private Vacation getVac(ProcessInstance instance) {
	        Integer days = runtimeService.getVariable(instance.getId(), "days", Integer.class);
	        String reason = runtimeService.getVariable(instance.getId(), "reason", String.class);
	        Vacation vac = new Vacation();
	        vac.setApplyUser(instance.getStartUserId());
	        vac.setDays(days);
	        vac.setReason(reason);
	        Date startTime = instance.getStartTime(); // activiti 6 才有
	        vac.setApplyTime(startTime);
	        vac.setApplyStatus(instance.isEnded() ? "申请结束" : "等待审批");
	        return vac;
	    }
	 
	   public Object myVacRecord(String userName) {
	        List<HistoricProcessInstance> hisProInstance = historyService.createHistoricProcessInstanceQuery()
	                .processDefinitionKey(PROCESS_DEFINE_KEY).startedBy(userName).finished()
	                .orderByProcessInstanceEndTime().desc().list();

	        List<Vacation> vacList = new ArrayList<>();
	        for (HistoricProcessInstance hisInstance : hisProInstance) {
	            Vacation vacation = new Vacation();
	            vacation.setApplyUser(hisInstance.getStartUserId());
	            vacation.setApplyTime(hisInstance.getStartTime());
	            vacation.setApplyStatus("申请结束");
	            List<HistoricVariableInstance> varInstanceList = historyService.createHistoricVariableInstanceQuery()
	                    .processInstanceId(hisInstance.getId()).list();
	            ActivitiUtil.setVars(vacation, varInstanceList);
	            vacList.add(vacation);
	        }
	        return vacList;
	    }
	
}
