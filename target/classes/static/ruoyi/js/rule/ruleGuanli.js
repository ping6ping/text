var prefix = ctxPath+"/system/rule";



/*var dept_name = [[${user.dept_name}]];*/

//重置
function ruleReset(){
	
	 var ym=$("#ym").val();
		document.getElementById("queryForm").reset();
		$('#moreContent').hide();
		$('#business_type').selectpicker('val',[''])
		layui.formSelects.value('org_list', []); 
		$('#flag').val('1');
		$(".moreDetails").empty().html("更多条件<span class='glyphicon glyphicon-chevron-down'</span>");
		 if(ym=="ZX")
	    {
			 $.table.searchZX();
	    }
		 else
		 {
			 $.table.search();
		 }
		 $('#justWatch').html('仅看收藏');
		 hideField();
		
	}

//打开重置确认窗口
function openJD(id,title, url, width, height) {
	
	//如果是移动端，就使用自适应大小弹窗
	if (navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) {
	    width = 'auto';
	    height = 'auto';
	}
	if ($.common.isEmpty(title)) {
        title = false;
    };
    if(title == 1)
    {
    	title = "规则废弃";
    }
    else if(title == 2)
    {
    	title = "规则维护";
    }
    if ($.common.isEmpty(url)) {
        url = "/404.html";
    };
    if ($.common.isEmpty(width)) {
    	width = 800;
    };
    if ($.common.isEmpty(height)) {
    	height = ($(window).height() - 50);
    };
	layer.open({
		type: 2,
		area: [width + 'px', height + 'px'],
		fix: false,
		//不固定
		maxmin: true,
		shade: 0.3,
		title: title,
		content: ctxPath+"/system/rule/updateJD/"+id,
		btn: ['确定', '关闭'],
	    // 弹层外区域关闭
		shadeClose: true,
		yes: function(index, layero) {
			 var iframeWin = layero.find('iframe')[0];
 	        iframeWin.contentWindow.submitJD();
	    },
	    end: function(index) {
	    
	        return true;
	    }
	});
}

	    $(function() {
	    	$("#rule_status").css("color", "#6c1988");
	    	 var ym=$("#ym").val();
	    	 if(flag != '1'){
	    		 $("#moreContent").hide(); 
	    	 }
			 var obj = document.getElementById("isAccept");
			 var obj2 = document.getElementById("sljd");
			 if(obj == null){
				 obj = obj2;
			 }
			 for(i=0;i<obj.length;i++){
		        if(obj[i].value==flag)
		            obj[i].selected = true;
		     }
	          if(ym=="ZX")
	          {
	        	  $('#fbBT').hide();
	        	  var options = {
	      		        uniqueId: "id",
	      		        url: prefix + "/listData",
	      		        createUrlSL:prefix + "/listSL/{id}",
	      		        createUrl: prefix + "/add",
	      		        updateUrlXQ: prefix + "/editZX/{id}",  
	      		        sortName: "create_time",
	      		        sortOrder: "desc",
	      		        sortable: true,
	      		        modalName: "规则",
	      		        search: false,
	      		        showExport: false,
	      		        columns: [{
	      		        	field: 'id',
	      		        	align:"center",
	      		    		/*title: '规则主键',*/
	      		    		visible:false,
	      		    		formatter:function (value, row, index) {
	      		    			
	      		    			return value;
	      		    		}
	      		        },{
	      		        	field: 'rule_code',
	      		        	align:"center",
	      		    		title: '规则编号',
	      		    		width: '120px' ,
	      		    		class:'colStyle',
	      		    		visible:false,
	      		    		formatter : function(value, row, index) {
	      		    			if(value == '' || value == null){
	      		    				return "-";
	      		    			}else{
	      		    				/*return value;*/
	      		    				return	'<span   title="'+value+'"  >'+value+'</span> '
	      		    			}
	      		    		}
	      		        },{
	      		        
	      		        	field: 'title',
	      		        	align:"center",
	      		    		title: '规则标题',
	      		    		width: '200px',
	      		    		class:'colStyle',
	      		    		formatter : function(value, row, index) {
	      		    			 if(row.title.length > 22){
        		    				 return	'<a  data-toggle="popover" data-id='+row.id+'  href="#" onclick="detail(\'' + row.id + '\')"   onmouseover="overTitle(this)" onmouseout="outTitle(this)" >'+row.title.substring(0,22)+"..."+'</a> ';
        		    		     }
        		    			 else
        		    			 {
        		    				 return	'<a  data-toggle="popover" data-id='+row.id+'  href="#" onclick="detail(\'' + row.id + '\')"  onmouseover="overTitle(this)" onmouseout="outTitle(this)" >'+row.title+'</a> '; 
        		    			 }
	      		    			
	      		    		}
	      		        },{
	      		        	
	      		        	field: 'business_type_text',
	      		        	align:"center",
	      		    		title: '业务类型',
	      		    		width: '120px' ,
	      		    		class:'colStyle',
	      		    		formatter : function(value, row, index) {
	      		    			if(value == '' || value == null){
	      		    				return "-";
	      		    			}else{
	      		    				return "<span title='"+value+"'>"+value+"</span>";
	      		    			}
	      		    		}
	      		        },{
	      		        	field: 'org_list',
	      		        	align:"center",
	      		    		title: '委托机构',
	      		    		width: '240px' ,
	      		    		class:'colStyle',
	      		    		visible:false,
	      		    		formatter : function(value, row, index) {
	      		    			if(value == '' || value == null){
	      		    				return "-";
	      		    			}else{
	      		    				/*return value.substring(0,value.lastIndexOf(','));*/
	      		    				return	'<span   title="'+value.substring(0,value.lastIndexOf(','))+'"  >'+value.substring(0,value.lastIndexOf(','))+'</span> '
	      		    			}
	      		    		}
	      		        },{
	      		        	field: 'r_level',
	      		        	align:"center",
	      		    		title: '重要程度',
	      		    		width: '70px' ,
	      		    		formatter : function(value, row, index) {
	      		    			if(value==1)
	      		    			{
	      		    				return "<span class='fontStyle' style='color:#f08014'>高</span>";
	      		    			}
	      		    			else if(value ==2)
	      		    			{
	      		    				return "<span class='fontStyle' style='color:#e6a500'>中</span>";
	      		    			}
	      		    			else if (value == 3)
	      		    			{
	      		    				return "<span class='fontStyle' style='color:#7d9f2a'>低</span>";
	      		    			}
	      		    			else
	      		    			{
	      		    				return '-';
	      		    			}
	      		    		}
	      		        },{
	      		        	field: 'create_time',
	      		        	align:"center",
	      		    		title: '发布时间',
	      		    		width: '180px' ,
	      		    		sortable : true,
	      		    		formatter : function(value, row, index) {
	      		    			
	      		    			if (value == null)
	      		    			{
	      		    				return "";
	      		    		    }
	      		    		      return  (new Date(value)).format("yyyy-MM-dd hh:mm:ss");
	      		    				            
	      		    		}
	      		        },{
	      		        	field: 'publish_user',
	      		        	align:"center",
	      		    		title: '发布人员',
	      		    		width: '180px' ,
	      		    		visible:false,
	      		    		formatter : function(value, row, index) {
	      		    			if(value == '' || value == null){
	      		    				return "-";
	      		    			}else{
	      		    				return value;
	      		    			}
	      		    		}
	      		        },{
	      		        	field: 'update_time',
	      		        	align:"center",
	      		    		title: '更新时间',
	      		    		width: '180px' ,
	      		    		sortable : true,
	      		    		visible:false,
	      		    		formatter : function(value, row, index) {
	      		    			if (value == null||value == "")
	      		    			{
	      		    				return "-";
	      		    		    }
	      		    			else
	      		    			{
	      		    				return value;
	      		    			}
	      		    		}
	      		        },{
	      		        	field: 'update_user',
	      		        	align:"center",
	      		    		title: '更新人员',
	      		    		width: '180px' ,
	      		    		visible:false,
	      		    		formatter : function(value, row, index) {
	      		    			if(value == '' || value == null){
	      		    				return "-";
	      		    			}else{
	      		    				return value;
	      		    			}
	      		    		}
	      		        },{
	      		        	field: 'effective_time',
	      		        	align:"center",
	      		    		title: '生效日期',
	      		    		width: '120px' ,
	      		    		sortable : true,
	      		    		formatter : function(value, row, index) {
	      		    			if (value == null)
	      		    			{
	      		    				return "";
	      		    		    }
	      		    		      return  (new Date(value)).format("yyyy-MM-dd");
	      		    		}
	      		        },{
	      		        	field: 'expire_time',
	      		        	align:"center",
	      		    		title: '失效日期',
	      		    		width: '120px' ,
	      		    		sortable : true,
	      		    		formatter : function(value, row, index) {
	      		    			if (value == null)
	      		    			{
	      		    				return "";
	      		    		    }
	      		    		      return  (new Date(value)).format("yyyy-MM-dd");
	      		    		}
	      		        },{
	      		        	field: 'rule_status',
	      		        	align:"center",
	      		    		title: '规则状态',
	      		    		width: '80px' ,
	      		    		formatter : function(value, row, index) {
	      		    			if(value == 1)
	      		    			{
	      		    				return '待生效';
	      		    			}
	      		    			else if(value == 2)
	      		    			{
	      		    				return '已生效';
	      		    			}
	      		    			else if(value == 3)
	      		    			{
	      		    				return '已失效';
	      		    			}
	      		    			else if(value == 4)
	      		    			{
	      		    				return '废弃中';
	      		    			}
	      		    			else if(value == 5)
	      		    			{
	      		    				return '已废弃';
	      		    			}
	      		    			else
	      		    			{
	      		    				return "-";
	      		    			}
	      		    		}
	      		        },
	      		      {
	      		        	field: 'sljd',
	      		        	align:"center",
	      		    		title: '受理进度',
	      		    		width: '80px' ,
	      		    		formatter : function(value, row, index) {
	      		    			
	      		    			if(row.taccepts!=null)
	      		    			{
	      		    				if(row.taccepts.indexOf(row.dept_name)!=-1)
		      		    			{
		      		    				return '<a data-toggle="popover1" data-id="'+row.id+'" onmouseover="overSljd(this)" onmouseout="outSljd(this)">已受理</a>';
		      		    			}
	      		    				else
	      		    				{
	      		    				    return '<a data-toggle="popover1" data-id="'+row.id+'" onmouseover="overSljd(this)" onmouseout="outSljd(this)">未受理</a>';
	      		    				}
	      		    			}
	      		    			else
	      		    			{
	      		    				    return '<a data-toggle="popover1" data-id="'+row.id+'" onmouseover="overSljd(this)" onmouseout="outSljd(this)">未受理</a>';
	      		    			}
	      		    			
	      		    			
	      		    		}
	      		        },
	      		        {
	      		            title: '操作',
	      		            align: 'center',
	      		            width: '100px',
	      		          visible: roleAttr == "2" ? false : true,
	      		            formatter: function(value, row, index) {	
	      		            	
	      		                if(roleAttr == "1"){
	      		            	var actions = [];
	      		                
	      		                if(row.taccepts!=null&&(row.taccepts.indexOf(row.dept_name)!=-1) && row.tCollections!=null&&(row.tCollections.indexOf(row.login_id)!=-1))
	      		                {
	      		                	actions.push('<a id="sc'+row.id+'" title="取消收藏" style="margin-top:0px" class="padCLJ qxsczx" href="#" onclick="collect(\'' + row.id + '\')"></a> ');
	      		                	 return actions.join('');
	      		                }
	      		                else if(row.taccepts!=null&&(row.taccepts.indexOf(row.dept_name)!=-1) && (row.tCollections==null||(row.tCollections.indexOf(row.login_id)==-1)))
	      		                {
	      		              	   actions.push('<a id="sc'+row.id+'" title="收藏" style="margin-top:0px" class="padCLJ sczx" href="#" onclick="collect(\'' + row.id + '\')"></i></a> ');
	      		              	   return actions.join('');
	      		                }
	      		                else if(row.tCollections!=null&&(row.tCollections.indexOf(row.login_id)!=-1))
	      		                {
	      		                	actions.push('<a id="sljd" title="受理" class="padCLJ accept" href="#" onclick="accept(\'' + row.id + '\',\''+row.title+'\')" ></a> ');
	      		                	actions.push('<a id="sc'+row.id+'" title="取消收藏" class="padCLJ qxsczx" href="#" onclick="collect(\'' + row.id + '\')"></a> ');
	      		                	 return actions.join('');
	      		                }
	      		                else
	      		                {
	      		                	actions.push('<a id="sljd" title="受理" class="padCLJ accept" href="#" onclick="accept(\'' + row.id + '\',\''+row.title+'\')" ></a> ');
	      		                	actions.push('<a id="sc'+row.id+'" title="收藏" class="padCLJ sczx" href="#" onclick="collect(\'' + row.id + '\')"></a> ');
	      		                	return actions.join('');
	      		                }
	      		              
	      		            }
		      		               
	      		            }   
	      		            
	      		        }]
	      		    };
	        	  $.table.initZX(options);
	        	  if(flag == '1'){
	        		  queryList();
	 	    	 }
	          }
	          else{
	        	  $('#fbBT').show();
	        	  var options = {
	        		        uniqueId: "id",
	        		        url: prefix + "/listData",
	        		        createUrlSL:prefix + "/listSL/{id}",
	        		        createUrl: prefix + "/add",
	        		        updateUrl: prefix + "/edit/{id}",             //跳转编辑页面
	        		        updateUrlXQ: prefix + "/editXQ/{id}",          //跳转规则详情页面
	        		        updateUrlSL: prefix + "/editSL/{id}",
	        		        sortName: "create_time",
	        		        sortOrder: "desc",
	        		        sortable: true,
	        		        modalName: "规则",
	        		        search: false,
	        		        showExport: false,
	        		        columns: [{
	        		        	
	        		        	field: 'id',
	        		        	align:"center",
	        		    		/*title: '规则主键',*/
	        		    		visible:false,
	        		    		formatter:function (value, row, index) {
	        		    			
	        		    			return value;
	        		    		}
	        		        },{
	        		        	field: 'rule_code',
	        		        	align:"center",
	        		    		title: '规则编号',
	        		    		width: '120px' ,
	        		    		class:'colStyle',
	        		    		visible:false,
	        		    		formatter : function(value, row, index) {
	        		    			if(value == '' || value == null){
	        		    				return "-";
	        		    			}else{
	        		    				/*return value;*/
	        		    				return	'<span   title="'+value+'"  >'+value+'</span> '
	        		    			}
	        		    		}
	        		        },{
	        		        
	        		        	field: 'title',
	        		        	align:"center",
	        		    		title: '规则标题',
	        		    		width: '200px',
	        		    		class:'colStyle',
	        		    		formatter : function(value, row, index) {
	        		    			 if(row.title.length > 22){
	        		    				 return	'<a  data-toggle="popover" data-id='+row.id+'  href="#" onclick="detailZX(\'' + row.id + '\')" onmouseover="overTitle(this)" onmouseout="outTitle(this)">'+row.title.substring(0,22)+"..."+'</a> ';
	        		    		     }
	        		    			 else
	        		    			 {
	        		    				 return	'<a  data-toggle="popover" data-id='+row.id+'  href="#" onclick="detailZX(\'' + row.id + '\')" onmouseover="overTitle(this)" onmouseout="outTitle(this)">'+row.title+'</a> '; 
	        		    			 }
	        		    		}
	        		        },{
	        		        	
	        		        	field: 'business_type_text',
	        		        	align:"center",
	        		    		title: '业务类型',
	        		    		width: '120px' ,
	        		    		class:'colStyle',
	        		    		formatter : function(value, row, index) {
	        		    			if(value == '' || value == null){
	        		    				return "-";
	        		    			}else{
	        		    				return "<span title='"+value+"'>"+value+"</span>";
	        		    			}
	        		    		}
	        		        },{
	        		        	field: 'org_list',
	        		        	align:"center",
	        		    		title: '委托机构',
	        		    		width: '240px' ,
	        		    		class:'colStyle',
	        		    		visible:false,
	        		    		formatter : function(value, row, index) {
	        		    			
	        		    			if(value == '' || value == null){
	        		    				return "-";
	        		    			}else{
	        		    				/*return value.substring(0,value.lastIndexOf(','));*/
	        		    				return	'<span   title="'+value.substring(0,value.lastIndexOf(','))+'"  >'+value.substring(0,value.lastIndexOf(','))+'</span> '
	        		    			}
	        		    		}
	        		        },{
	        		        	field: 'r_level',
	        		        	align:"center",
	        		    		title: '重要程度',
	        		    		width: '70px' ,
	        		    		formatter : function(value, row, index) {
	        		    			if(value==1)
	          		    			{
	        		    				return "<span class='fontStyle' style='color:#f08014'>高</span>";
	          		    			}
	          		    			else if(value ==2)
	          		    			{
	          		    			    return "<span class='fontStyle' style='color:#e6a500'>中</span>";
	          		    			}
	          		    			else if (value == 3)
	          		    			{
	          		    				return "<span class='fontStyle' style='color:#7d9f2a'>低</span>";
	          		    			}
	          		    			else
	          		    			{
	          		    				return '-';
	          		    			}
	        		    		}
	        		        },{
	        		        	field: 'create_time',
	        		        	align:"center",
	        		    		title: '发布时间',
	        		    		width: '180px' ,
	        		    		sortable : true,
	        		    		formatter : function(value, row, index) {
	        		    			
	        		    			if (value == null)
	        		    			{
	        		    				return "";
	        		    		    }
	        		    		      return  (new Date(value)).format("yyyy-MM-dd hh:mm:ss");
	        		    				            
	        		    		}
	        		        },{
	        		        	field: 'publish_user',
	        		        	align:"center",
	        		    		title: '发布人员',
	        		    		width: '180px' ,
	        		    		visible:false,
	        		    		formatter : function(value, row, index) {
	        		    			if(value == '' || value == null){
	        		    				return "-";
	        		    			}else{
	        		    				return value;
	        		    			}
	        		    		}
	        		        },{
	        		        	field: 'update_time',
	        		        	align:"center",
	        		    		title: '更新时间',
	        		    		width: '180px' ,
	        		    		sortable : true,
	        		    		visible:false,
	        		    		formatter : function(value, row, index) {
	        		    			if (value == null || value == "")
	        		    			{
	        		    				return "-";
	        		    		    }
	        		    			else
	        		    			{
	        		    				return value;
	        		    			}
	        		    		      
	        		    		}
	        		        },{
	        		        	field: 'update_user',
	        		        	align:"center",
	        		    		title: '更新人员',
	        		    		width: '180px' ,
	        		    		visible:false,
	        		    		formatter : function(value, row, index) {
	        		    			if(value == '' || value == null){
	        		    				return "-";
	        		    			}else{
	        		    				return value;
	        		    			}
	        		    		}
	        		        },{
	        		        	field: 'effective_time',
	        		        	align:"center",
	        		    		title: '生效日期',
	        		    		width: '120px' ,
	        		    		sortable : true,
	        		    		formatter : function(value, row, index) {
	        		    			if (value == null)
	        		    			{
	        		    				return "";
	        		    		    }
	        		    		      return  (new Date(value)).format("yyyy-MM-dd");
	        		    		}
	        		        },{
	        		        	field: 'expire_time',
	        		        	align:"center",
	        		    		title: '失效日期',
	        		    		width: '120px' ,
	        		    		sortable : true,
	        		    		formatter : function(value, row, index) {
	        		    			
	        		    			if (value == null)
	        		    			{
	        		    				return "";
	        		    		    }
	        		    		      return  (new Date(value)).format("yyyy-MM-dd");
	        		    		}
	        		        },{
	        		        	field: 'rule_status',
	        		        	align:"center",
	        		    		title: '规则状态',
	        		    		width: '80px' ,
	        		    		formatter : function(value, row, index) {
	        		    			if(value == 1)
	          		    			{
	          		    				return '待生效';
	          		    			}
	          		    			else if(value == 2)
	          		    			{
	          		    				return '已生效';
	          		    			}
	          		    			else if(value == 3)
	          		    			{
	          		    				return '已失效';
	          		    			}
	          		    			else if(value == 4)
	          		    			{
	          		    				return '废弃中';
	          		    			}
	          		    			else if(value == 5)
	          		    			{
	          		    				return '已废弃';
	          		    			}
	          		    			else
	          		    			{
	          		    				return "-";
	          		    			}
	        		    		}
	        		        },
	        		        {
	        		            title: '操作',
	        		            align: 'center',
	        		            width: '150px',
	        		            //text-align:center
	        		            visible: roleAttr == "2" ? false : true,
	        		            formatter: function(value, row, index) {
	        		            	
	        		            	if(roleAttr == "1") {
	        		            	var actions = [];
	        		            	if(row.rule_status == 5)
	        		            	{
	        		            		actions.push('<a id="sljd" class="padCLJ sljd" title="受理进度" href="#" onclick="$.operate.addSL(\'' + row.id + '\')" ></a> ');
	        		            		actions.push('<a id="fq'+row.id+'" class="qxfq" title="取消废弃"  onclick="openJD(\'' + row.id + '\',2)"></a> ');
	        		            		
	        		            		return actions.join('');
	        		            	}
	        		            	else if(row.rule_status == 4 && row.tCollections!=null&&(row.tCollections.indexOf(row.login_id)!=-1))
	        		            	{
	        		            		actions.push('<a id="sljd" class="padCLJ sljd" title="受理进度" href="#" onclick="$.operate.addSL(\'' + row.id + '\')" ></a> ');
	        		            		actions.push('<a id="sc'+row.id+'"  title="取消收藏" class="padCLJ qxsc" href="#" onclick="collect(\'' + row.id + '\')"></a> ');
	        		            		actions.push('<a id="fq'+row.id+'" title="取消废弃" class="qxfq" onclick="openJD(\'' + row.id + '\',2)"></a> ');
	        		            		return actions.join('');
	        		            	}
	        		            	else if(row.rule_status == 4)
	        		            	{
	        		            		actions.push('<a id="sljd" title="受理进度" class="padCLJ sljd" href="#" onclick="$.operate.addSL(\'' + row.id + '\')" ></a> ');
	        		            		actions.push('<a id="sc'+row.id+'" title="收藏" class="padCLJ sc" href="#" onclick="collect(\'' + row.id + '\')"></a> ');
	        		            		actions.push('<a id="fq'+row.id+'"  title="取消废弃" class="qxfq"  onclick="openJD(\'' + row.id + '\',2)"></a> ');
	        		            		
	        		            		return actions.join('');
	        		            	}
	        		            	else if(row.tCollections!=null&&(row.tCollections.indexOf(row.login_id)!=-1))
	        		            	{
	        		            		actions.push('<a id="sljd" title="受理进度" class="padCLJ sljd" href="#" onclick="$.operate.addSL(\'' + row.id + '\')" ></a> ');
	        		            		actions.push('<a title="取消收藏" id="sc'+row.id+'" class="padCLJ qxsc" href="#" onclick="collect(\'' + row.id + '\')"></a> ');
	    		            		    actions.push('<a title="编辑" id="bj'+row.id+'" display="block" class="padCLJ edit" href="#" onclick="$.operate.editGL(\'' + row.id + '\')"></a> ');
	    		            		    actions.push('<a title="废弃" class="feiqi" id="fq'+row.id+'"   onclick="openJD(\'' + row.id + '\',1)"></a> ');
	    		            		    return actions.join('');
	        		            	}
	        		            	else
	        		            	{
	              		                actions.push('<a title="受理进度" id="sljd" class="padCLJ sljd" href="#" onclick="$.operate.addSL(\'' + row.id + '\')" ></a> ');
	              		                actions.push('<a title="收藏" id="sc'+row.id+'" class="padCLJ sc" href="#" onclick="collect(\'' + row.id + '\')"></a> ');
	              		                actions.push('<a title="编辑" id="bj'+row.id+'" display="block" class="padCLJ edit" href="#" onclick="$.operate.editGL(\'' + row.id + '\')"></a> ');
	              		                actions.push('<a title="废弃" id="fq'+row.id+'"  class="feiqi" onclick="openJD(\'' + row.id + '\',1)"></a> ');
	              		                return actions.join('');
	        		            	}
	        		            	}
	        		            }
	        		        }]
	        		    };
	        	  $.table.initGL(options);
	          }
		    
	    });

function showConditionDetails()
{
	
	
	var ym=$("#ym").val();
	var content=$("#moreContent");
	if(content.is(":visible")){
		/*$("#moreContent input").val("");
		 	
		 	if(ym=="ZX")
		 	{
		 		$("#rule_status,#business_type,#r_level,#isAccept").val("");
		 	}
		 	else
		 	{
		 		layui.formSelects.value('org_list',[]);
		 		$("#moreContent select").val('');
		 	}*/
		 	
		$(".moreDetails").empty().html("更多条件<span class='glyphicon glyphicon-chevron-down'</span>");
		hideField();
		content.hide();
	}else{
		$(".moreDetails").empty().html("更多条件<span class='glyphicon glyphicon-chevron-up'></span>");
		showField();
		content.show();
	}	
}

function hideField()
{
	$('#bootstrap-table').bootstrapTable('hideColumn', 'rule_code');
	$('#bootstrap-table').bootstrapTable('hideColumn', 'org_list');
	$('#bootstrap-table').bootstrapTable('hideColumn', 'publish_user');
	$('#bootstrap-table').bootstrapTable('hideColumn', 'update_time');
	$('#bootstrap-table').bootstrapTable('hideColumn', 'update_user');
	
}

function showField()
{
	$('#bootstrap-table').bootstrapTable('showColumn', 'rule_code');
	$('#bootstrap-table').bootstrapTable('showColumn', 'org_list');
	$('#bootstrap-table').bootstrapTable('showColumn', 'publish_user');
	$('#bootstrap-table').bootstrapTable('showColumn', 'update_time');
	$('#bootstrap-table').bootstrapTable('showColumn', 'update_user');
	/*showTitle();*/
	/*if($("#ym").val() == 'ZX')
	{*/
		/*showPopover1();*/
	//}
}
	
function  detail(id)
{
	 //var t = title.substring(0,2) + '...'+ title.substring(title.length-2,title.length);
	 var url = prefix + "/editZX/"+id
	 createMenuItem(url, "规则详情");
}

function  detailZX(id)
{
	/* var t = title.substring(0,2) + '...'+ title.substring(title.length-2,title.length);*/
	 var url = prefix + "/editXQ/"+id
	 createMenuItem(url, "规则详情");
}

function queryRuleList() {
	
	$('.bootstrap-table').bootstrapTable();
	var columns =[
    ];
	var url = prefix + "/listData";
	
	var params = function queryParams(params) {   
		return { 
			pageNumber: params.offset,
            pageSize: params.limit,  
			 }; 
	}
	
	$.initTable(columns, url,params);
}

function collect(id) {
	
	if($('#sc'+id).attr("title")=="收藏")
	{
			$.ajax({
				type : 'post',
				url: prefix + "/ruleCollect/1",
				data : {
					"id":id
				},
				success : function(result) {
					
					if (result.code == web_status.SUCCESS) {
	                	$.modal.msgSuccess("收藏成功");
	                	$('#bootstrap-table').bootstrapTable('refresh')
	                } else {
	                	$.modal.msgError(result.msg);
	                }
				}
			});
	}
	else if($('#sc'+id ).attr("title")=="取消收藏")
	{
			$.ajax({
				type : 'post',
				url: prefix + "/ruleCollect/2",
				data : {
					"id":id
				},
				success : function(result) {
					
					if (result.code == web_status.SUCCESS) {
	                	$.modal.msgSuccess("取消收藏");
	                	$('#bootstrap-table').bootstrapTable('refresh')
	                } else {
	                	$.modal.msgError(result.msg);
	                }
				}
			});
		/*});*/
	}

}

function queryCollect(id) {
		$.ajax({
			type : 'post',
			url: prefix + "/collect",
			success : function(result) {
				if (result.code == web_status.SUCCESS) {
                	$.modal.msgSuccess(result.msg);
                
                } else {
                	$.modal.msgError(result.msg);
                }
			}
		});
}

function search()
{
	if(!$.common.trim($("#rule_title").val()))
	{
		
		$.modal.msgWarning("规则标题不能为空");
		return;
	}
	
}

function accept(value,ruleTt) {
	 layer.confirm('是否确认受理以下规则？'+"<br/><font color='#040833'>"+ruleTt+"</font>", {
		  btn: ['受理无误','有疑义','取消'],title:"规则受理",area:['410px','200px']
		}, function(index){
			$.ajax({
				type : 'post',
				async : false,
				url : ctx + "/system/rule/accept",
				data : {
					"rule_id" : value
				},
				success : function(result) {
  					if (result.code == web_status.SUCCESS) {
	                	$.modal.msgSuccess("受理成功");
	                	$('#bootstrap-table').bootstrapTable('refresh')
	                } else {
	                	$.modal.msgError(result.msg);
	                }
				}
			});
            layer.close(index);
		},function(index)
		{
			
			var paramContent = '<br/>建议发布互动，对有疑义的地方提出意见或见解。<a onclick="Interactive(\''+value+'\')">一键互动</a>'
			 layer.close(index);
			 layer.confirm('规则有疑义！'+paramContent, {
				  btn: ['关闭'],title:"提示",area:['410px','200px']
				}, function(index){
					
		            layer.close(index);
				});
			 
		},function(index){
			
			layer.close(index);
		}); 

}

function showPress(id)
{
	
	var content = "";
	$.ajax({
		cache : true,
		type : "post",
		url : ctx + "system/rule/acceptInfoWB",
		data : {
			"rule_id":id,
		},
		async : false,
		error : function(request) {
			$.modal.alertError("系统错误");
		},
		success : function(data) {
			//
			
			for(var i = 0;i < data.length;i++)
			{
				var rule_statue = data[i].rule_status;
			    rule_statue = rule_statue==1?"待生效":rule_statue==2?"已生效":rule_statue==3?"已失效":rule_statue==4?"废弃中":rule_statue==5?"已废弃":"-";
				var start_time = data[i].publish_time == null ?"-":data[i].publish_time;
				var is_accept = data[i].is_accept == 2?"已受理":"未受理";
			    var acceptuser = data[i].accept_user==null?"-":data[i].accept_user;
			    var accept_time = data[i].accept_time_wb == null?"-":data[i].accept_time_wb;
			    var t ="<tr><td align='center'>"+rule_statue+"</td><td align='center'>"+start_time+"</td><td align='center'>"
				+is_accept+"</td><td align='center'>"+acceptuser+"</td><td align='center'>"+accept_time+"</td></tr>" ; 
				content = content + t;
			}
		}
	});
	return content;
}


$('#justWatch').click(function() {
	if ($.common.trim($('#justWatch').html()) == "仅看收藏") {
		$('#flag').val("2");

		$('#justWatch').html('查看全部')
	} else if ($.common.trim($('#justWatch').html()) == "查看全部") {
		$('#flag').val("1");

		$('#justWatch').html('仅看收藏')
	}
	queryList();
})

function queryList()
{	
	
	    var ym=$("#ym").val();
	    var formSelects = layui.formSelects;
	    var params = $("#bootstrap-table").bootstrapTable('getOptions');  		  
	    params.queryParams = function(params) {
	     var search = {};
	     $.each($("#queryForm").serializeArray(), function(i, field) {
	         search[field.name] = field.value;
	     });  
	     if(ym=="ZX")
	     {
	    	 search.type = "zx";
	     }
	     search.flag     = $('#flag').val();
	     search.org_list = formSelects.value('org_list_value', 'valStr');   
	     search.pageSize = params.limit;
	     search.pageNum = params.offset / params.limit + 1;
	     search.searchValue = params.search;
	     search.orderByColumn = params.sort;
	     search.isAsc = params.order;
	        return search;
	    }           
	    $("#bootstrap-table").bootstrapTable('refresh', params);
}


function  getTitle(id)
{
	var title = '';
	$.ajax({
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		dataType:'text',
		type : 'post',
		async: false,
		url: prefix + "/getTitle/"+id,
		data : {
			"id":id
		},
		success : function(result) {
			title = result;
		}
	});
	return title;
}

function  getContext(id)
{
	var context = '';
	$.ajax({
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		dataType:'text',
		type : 'post',
		async: false,
		url: prefix + "/getContext/"+id,
		data : {
			"id":id
		},
		success : function(result) {
			context = result;
		}
	});
	return context;
}

window.top["reload_daiBanTable"]=function(){
	$('#bootstrap-table').bootstrapTable('refresh')
};


function overTitle(e)
{
	
	 var element = $(e);
	 var rule_id = element.attr("data-id");
	 
	 var title = getTitle(rule_id);
	 var context = getContext(rule_id);
	 
	 if(typeof context == "undefined" || context == null || context == ""||context =="null")
	 {
		 context = "-";
	 }
	 element.popover({
        trigger: 'manual',
        placement: 'right', //top, bottom, left or right
        html: 'true',
        content: "规则标题：<br/><span>"+title+"</span><br/><br/>规则概述：<br/><span>"+context+"</span>",

    })
      element.popover("show");
      $('.arrow').remove();
}

function outTitle(e)
{
	var element = $(e);
	element.popover('hide');
	  /*setTimeout(function () {
	      if (!$(".popover:hover").length) {
	    	  element.popover("hide")
	      }
	  }, 100);*/
}

function overSljd(e)
{
	var contentStart = '<table data-mobile-responsive="true" class="table table-hover"><thead><tr><th data-field="dictId" tabindex="0"><div class="th-inner " style="text-align:center">规则状态</div>'+
	'<div class="fht-cell"></div></th><th data-field="dictName" tabindex="0"><div class="th-inner" style="text-align:center">开始时间</div><div class="fht-cell"></div>'+
    '</th><th data-field="dictType" tabindex="0"><div class="th-inner" style="text-align:center">受理进度</div><div class="fht-cell"></div></th><th data-field="dictType" tabindex="0">'+
    '<div class="th-inner" style="text-align:center">受理人</div><div class="fht-cell"></div></th><th data-field="dictType" tabindex="0"><div class="th-inner" style="text-align:center">受理时间</div><div class="fht-cell"></div></th></tr></thead><tbody>';
	 
	var contentEnd = '</tbody></table>'; 
	
	 var element = $(e);
		
	 var id = element.attr("data-id");
	 
	 if(typeof context == "undefined" || context == null || context == ""||context =="null")
	 {
		 context = "-";
	 }
	 element.popover({
         trigger: 'manual',
         placement: 'left', //top, bottom, left or right
         html: 'true',
         content: contentStart+showPress(id)+contentEnd,

     })
     
     element.popover("show");
     $('.arrow').remove();
}

function Interactive(id) {
	layer.close(layer.index);
	createMenuItem(prefix + "/creatInteraction/"+id+"/1","发布互动")
 }

function outSljd(e)
{
	var element = $(e);
	element.popover('hide');
}





