/* Buildless, browser-local explorer. No model APIs, remote fetches or analytics. */
(() => {
  "use strict";
  const data = window.MINERALEXP_DATA;
  const english = window.MINERALEXP_EN;
  if (!data || !english) {
    document.getElementById("result-count").textContent = "Dataset or English reading layer could not be loaded. Check assets/dataset.js and assets/english.js.";
    return;
  }
  const $ = (id) => document.getElementById(id);
  const escape = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const processInfo = [
    {name:"Source", id:"S", zh:"源 · 物质来源", short:"源", color:"#47755c"},
    {name:"Transport", id:"T", zh:"运 · 流体迁移", short:"运", color:"#52878a"},
    {name:"Deposition", id:"D", zh:"储 · 沉淀富集", short:"储", color:"#b18b43"},
    {name:"Modification", id:"M", zh:"变 · 后期改造", short:"变", color:"#af755c"},
    {name:"Preservation", id:"P", zh:"保 · 保存剥露", short:"保", color:"#76839e"}
  ];
  const classZh = {S1:"岩浆来源与演化",S2:"岩浆成矿潜力",S3:"金属与硫的来源",S4:"变质流体与金属释放",T1:"成矿流体来源",T2:"流体演化与多期活动",T3:"流体温压与挥发分",T4:"金属负载与迁移",T5:"构造控流通道",D1:"金的赋存机制",D2:"金的沉淀反应",D3:"元素转移与富集效率",D4:"矿化分带与空间响应",M1:"成矿年龄与事件序列",M2:"多期热液叠加",M3:"金的再活化与再沉淀",P1:"成矿后冷却与剥露",P2:"表生改造与次生富集",P3:"保存与隐伏矿预测"};
  const text = {
    en:{skip:"Skip to content",navDataset:"Dataset",navExplore:"Explore",navEvaluation:"Evaluation",heroEyebrow:"SCIENTIFIC REASONING, GROUNDED IN GEOLOGY",heroTitle:"From geological hypotheses<br>to experimental <em>evidence.</em>",heroDescription:"How well can an AI agent plan the experiments that a geological hypothesis needs? MineralExp connects real research questions with the scientific tasks behind published experiments.",exploreButton:"Explore the benchmark",downloadButton:"Download JSONL",heroNote:"Literature-grounded inputs · Expert-reviewed references · Scriptable evaluation",figureNote:"Five processes. One connected mineral system.",statCases:"Research cases",statClasses:"Scientific task categories",statOperations:"Reference operations",statProcesses:"Geological processes",datasetEyebrow:"01 / DATASET PORTRAIT",datasetTitle:"A mineral system, in perspective.",datasetDescription:"Different questions need different evidence. Explore how the benchmark covers the five processes of a mineral system.",coverageTitle:"Coverage across the dataset",processView:"5 processes",classView:"19 categories",chartHint:"Select a bar to browse matching cases.",taskNotTool:"A scientific task.<br>Not just an instrument.",taskExplanation:"The 19 categories describe what an experiment is intended to establish—such as a metal source, a fluid pathway, or an event sequence—not which machine is used.",meanLabelText:"reference categories<br>per case, on average",reviewNote:"References are expert-reviewed, literature-grounded annotations. Cases may span multiple processes.",taxonomyLink:"Read the taxonomy",exploreEyebrow:"02 / OPEN THE FIELD NOTEBOOK",exploreTitle:"Start with a real question.",exploreDescription:"Read the inputs given to an agent, then inspect the reference tasks and experiments. Every case links back to its publication.",tryCase:"Try a case",searchPlaceholder:"Search a location, hypothesis or case ID…",processLabel:"Geological process",classLabel:"Scientific task category",reset:"Reset",inputTab:"Agent input",referenceTab:"Reference experiments",explorerNote:"This public explorer displays references for inspection. Evaluation requests contain only the three input fields, shared taxonomy and output instructions—not publication metadata or reference answers. Original case text is retained when switching the interface language.",exampleEyebrow:"03 / A REAL AGENT WALKTHROUGH",exampleTitle:"Beyond a list of labels.",exampleDescription:"A saved, independent gpt-6.1-sol run illustrates the output protocol: category decisions, concrete experiments, and the evidence each would test.",exampleQuestion:"When did the ore form—and what happened later?",exampleContext:"The case contrasts sedimentary, magmatic and hydrothermal explanations for Bayan Obo. The agent selected chronology and hydrothermal overprinting tasks.",referenceLabels:"Reference",predictedLabels:"Prediction",exampleScope:"One saved case, not a leaderboard. Only category predictions were scored; the scientific quality of the text was not judged.",fullModelOutput:"View original output & scores",evalEyebrow:"04 / REPRODUCIBLE BY DESIGN",evalTitle:"Keep the experiment.<br>Measure the coverage.",evalDescription:"A common output contract makes harness–model combinations comparable. Designs and rationales are retained for later review; category labels drive the current scores.",step1Title:"Provide the same task",step1Text:"Hypothesis, initial information, available conditions, and the fixed 19-category taxonomy.",step2Title:"Plan and explain",step2Text:"Return all 19 decisions. For selected categories, describe experimental design, motivation, evidence, interpretation and limitations.",step3Title:"Score and preserve",step3Text:"Evaluate overall and by process. Keep raw responses, adapter-returned trajectories, structured predictions and score tables.",metricsTitle:"One run. Multiple views.",metricViews:"Overall · Five geological processes · Per-category · Per-case",accTitle:"Accuracy means exact-set agreement.",accText:"Predicting four correct categories out of ten gives 40% recall—not 40% accuracy.",metricCaveatTitle:"How to interpret Macro-F1",metricCaveat:"Fixed-label Macro-F1 includes categories with no positives. S4 has no positive reference cases, so a perfect full-dataset prediction scores 18/19, not 1. A supported-categories-only macro is also reported.",evalDocs:"Read the evaluation protocol",quickstartTitle:"RUN THE BENCHMARK",quickstartText:"Python 3.10+ · Offline scoring needs no model API.",copy:"Copy",footerDescription:"Experimental planning, grounded in real geoscience.",footerRights:"Data & code rights: see repository.",footerNote:"Static showcase · No model API calls · No accounts or analytics",allProcesses:"All processes",allClasses:"All categories",cases:"cases",of:"of",noResults:"No cases match these filters.",noCaseHint:"Try another keyword or reset the filters.",selectCase:"Select a case to read its inputs.",source:"Publication",sourceLink:"Source publication",share:"Share",downloadCase:"JSON ↓",hypothesis:"HYPOTHESIS",initialInformation:"INITIAL INFORMATION",availableConditions:"AVAILABLE CONDITIONS",agentOnly:"These are the three case-specific text fields supplied to the agent. The shared taxonomy and output instructions are added separately. Publication metadata shown above is not sent to the evaluated agent.",referenceUnion:"Reference task categories",operationsNote:"Categories are the union of the released, in-scope operations—not a claim that this is the only valid experimental plan.",purpose:"Original purpose",material:"Original material",mappingReason:"Category-mapping rationale",recordJson:"Original public dataset record · includes references",copyJson:"Copy JSON",copied:"Copied to clipboard",copyFailed:"Copy unavailable. Select the text to copy manually.",downloaded:"JSONL exported from the bundled public snapshot",shareLocal:"Publish this page before sharing a web link.",bayan:"Bayan Obo",liba:"Liba mineralization",upb:"U–Pb chronology",chartProcessNote:"Cases can belong to multiple processes. Bar lengths are fractions of all 277 cases, so counts do not sum to 277.",chartClassNote:"Number of cases with each reference category, out of 277. S4 has no positive reference cases in this snapshot.",snapshot:"Snapshot",design:"Experimental design",why_needed:"Why this experiment",expected_evidence:"Expected evidence",supports_hypothesis_if:"Would support the hypothesis if…",weakens_hypothesis_if:"Would weaken the hypothesis if…",limitations:"Limitations & prerequisites",selectionReason:"Why this category was selected",originalText:"Original model text · preserved, not translated or rewritten",exampleNoOutput:"No model output available.",operationCount:"reference operations",page:"Page"},
    zh:{skip:"跳到正文",navDataset:"数据概览",navExplore:"案例浏览",navEvaluation:"评测方法",heroEyebrow:"立足地学证据，评测科学推理",heroTitle:"从地质假说出发，<br>设计获取<em>证据</em>的实验。",heroDescription:"面对一个地质假说，AI 智能体能否规划出合适的验证实验？MineralExp 从真实研究中整理问题与实验，把实验规划转化为可复现的科学任务覆盖评测。",exploreButton:"浏览评测案例",downloadButton:"下载 JSONL 数据",heroNote:"论文依据输入 · 专家审核参考标签 · 可脚本化评测",figureNote:"五个过程，连接成矿系统的不同环节。",statCases:"真实研究案例",statClasses:"科学任务类别",statOperations:"参考实验操作 O",statProcesses:"成矿系统过程",datasetEyebrow:"01 / 数据集画像",datasetTitle:"从五个过程，理解成矿系统。",datasetDescription:"不同问题需要不同证据。按源、运、储、变、保五个过程，查看评测集的任务覆盖与类别分布。",coverageTitle:"数据集覆盖情况",processView:"五个过程",classView:"19 个类别",chartHint:"点击条形，浏览包含该过程或类别的案例。",taskNotTool:"评测科学目的，<br>不只是仪器名称。",taskExplanation:"19 类标签描述实验要回答的科学问题，例如金属来自哪里、流体沿何处运移、事件如何排序；并不是 19 种仪器或分析技术。",meanLabelText:"每个案例平均包含<br>的参考任务类别",reviewNote:"参考标签来自有论文依据、经专家审核的整理。同一案例可以跨越多个成矿过程。",taxonomyLink:"查看完整分类体系",exploreEyebrow:"02 / 打开研究记录",exploreTitle:"从一个真实问题开始。",exploreDescription:"先阅读交给智能体的输入，再查看参考科学任务和实验操作。每个案例均保留原始文献来源。",tryCase:"推荐案例",searchPlaceholder:"搜索地区、研究假说或案例编号…",processLabel:"成矿过程",classLabel:"科学任务类别",reset:"重置",inputTab:"智能体输入",referenceTab:"参考实验",explorerNote:"此公开浏览器展示参考答案，便于检查数据。正式评测只向智能体发送三项输入文本、通用分类体系和输出指令，不发送文献题录与金标。切换界面语言不会翻译或改写案例原文。",exampleEyebrow:"03 / 真实智能体输出示例",exampleTitle:"不止给出几个标签。",exampleDescription:"一次独立上下文的 gpt-6.1-sol 测试，展示完整输出协议：逐类判断、具体实验设计，以及每个实验期望检验的证据。",exampleQuestion:"矿体何时形成，之后又经历了什么？",exampleContext:"白云鄂博案例对比沉积同生、岩浆碳酸岩和后生热液解释。智能体选择了年代与事件序列、多期热液叠加两类任务。",referenceLabels:"参考标签",predictedLabels:"模型预测",exampleScope:"这是一个已保存的单案例，不是全量成绩或排行榜。当前仅评分分类结果，未对设计文本的科学质量打分。",fullModelOutput:"查看原始输出与完整评分",evalEyebrow:"04 / 面向可复现评测",evalTitle:"保留完整方案，<br>量化任务覆盖。",evalDescription:"统一输入输出协议，便于比较不同 Harness 与模型组合。实验设计和理由留存供后续分析；当前分类分数仅依据类别标签计算。",step1Title:"提供一致的任务输入",step1Text:"研究假说、初始信息、可用条件，以及固定的 19 类科学任务体系。",step2Title:"规划实验并解释理由",step2Text:"输出全部 19 类决策；为选中类别给出实验设计、动机、预期证据、解释条件和局限。",step3Title:"计算指标并完整留存",step3Text:"同时计算整体与五过程分数，保存原始返回、适配器提供的轨迹、结构化预测与指标表。",metricsTitle:"一次评测，多种视角。",metricViews:"整体 19 类 · 五个成矿过程 · 逐类 · 逐案例",accTitle:"Acc 指类别集合完全匹配率。",accText:"十个参考类别中正确预测四个，是 40% 召回率，不是 40% 准确率。",metricCaveatTitle:"如何解读 Macro-F1",metricCaveat:"固定类别 Macro-F1 包含没有正例的类别。当前 S4 无参考正例，因此全库预测全部正确时，固定 19 类 Macro-F1 仍为 18/19。脚本另报仅含有正例类别的 macro。",evalDocs:"阅读完整评分协议",quickstartTitle:"运行评测",quickstartText:"Python 3.10+ · 离线评分无需模型 API。",copy:"复制",footerDescription:"让实验规划，回到真实地学问题与证据。",footerRights:"数据与代码使用权利以源仓库为准。",footerNote:"纯静态展示 · 不调用模型 API · 无账户与分析追踪",allProcesses:"全部过程",allClasses:"全部类别",cases:"个案例",of:"/",noResults:"没有符合筛选条件的案例。",noCaseHint:"可以更换关键词，或重置筛选。",selectCase:"请选择案例阅读输入。",source:"来源文献",sourceLink:"原文出版页",share:"分享",downloadCase:"JSON ↓",hypothesis:"研究假说 · HYPOTHESIS",initialInformation:"初始信息 · INITIAL INFORMATION",availableConditions:"可用条件 · AVAILABLE CONDITIONS",agentOnly:"以上是实际提供给智能体的三项个案文本；评测时另外添加通用分类体系与输出要求。上方展示的文献题录不作为智能体输入。",referenceUnion:"参考科学任务类别",operationsNote:"标签是已发布、纳入范围的实验操作所覆盖类别的并集，不表示只有这一套实验方案合理。",purpose:"原始实验目的",material:"原始实验材料",mappingReason:"类别映射理由",recordJson:"公开数据集原始记录 · 含参考答案",copyJson:"复制 JSON",copied:"已复制到剪贴板",copyFailed:"暂不能自动复制，请手动选择文字。",downloaded:"已从本地公开快照导出 JSONL",shareLocal:"请先将网页托管上线，再分享网页链接。",bayan:"白云鄂博",liba:"李坝矿化研究",upb:"U–Pb 年代约束",chartProcessNote:"同一案例可属于多个过程。条形长度为该过程案例数占全部 277 条的比例，五过程数量之和不等于 277。",chartClassNote:"各参考类别覆盖的案例数，分母为全部 277 条。当前快照中的 S4 没有参考正例。",snapshot:"数据快照",design:"具体实验设计",why_needed:"为什么需要这个实验",expected_evidence:"期望获得的证据",supports_hypothesis_if:"什么结果支持假说或竞争解释",weakens_hypothesis_if:"什么结果削弱或限制假说",limitations:"局限与待确认前提",selectionReason:"选中该类别的理由",originalText:"原始模型文本 · 未翻译或重写",exampleNoOutput:"没有可展示的模型输出。",operationCount:"项参考实验操作",page:"第"}
  };
  const initialParams = new URLSearchParams(location.search);
  Object.assign(text.en, {
    explorerNote:"This public explorer displays references for inspection. Evaluation requests include only the three input fields, shared taxonomy and output instructions—not publication metadata or reference answers. English reading translations are separate from the unchanged source records; JSON exports retain the originals.",
    readingNotice:"English reading translation · Original evaluation inputs, references and recorded model output are unchanged. Inspect or download the original JSON for the source wording.",
    originalText:"English translation of the saved model output · Not a new model run or a new evaluation",
    purpose:"Reported experimental purpose", material:"Reported experimental material",
    mappingReason:"Category mapping · English summary",
    mappingSummary:"Assigned to {categories} according to the reported scientific purpose and material, not the instrument name alone. The original mapping rationale is preserved in the source JSON.",
    recordJson:"Original public dataset record · Source language preserved; includes references"
  });
  Object.assign(text.zh, {
    explorerNote:"此公开浏览器展示参考答案，便于检查数据。正式评测只向智能体发送三项输入文本、通用分类体系和输出指令，不发送文献题录与金标。英文模式使用独立阅读译文；中文原文和下载的 JSON 均保持不变。",
    readingNotice:"", mappingSummary:""
  });
  let savedLanguage = "en";
  try { savedLanguage = localStorage.getItem("mineralexp-language") || "en"; } catch (_) {}
  const state = {lang: initialParams.get("lang") === "zh" ? "zh" : (initialParams.get("lang") === "en" ? "en" : savedLanguage === "zh" ? "zh" : "en"), query:"", process:"", category:"", chart:"process", active:initialParams.get("case") || data.cases[0].task_id, tab:"input", page:1, exampleClass:"M1"};
  const byId = new Map(data.cases.map(row => [row.task_id,row]));
  if (!byId.has(state.active)) state.active = data.cases[0].task_id;
  const classes = data.taxonomy.classes;
  const classMap = new Map(classes.map(row => [row.ID,row]));
  const searchable = new Map(data.cases.map(row => [row.task_id, [row.task_id,row.source.title,row.source.doi,row.source.year,...Object.values(row.input).map(x=>x.text),...row.reference.O.map(o=>o.original_description),JSON.stringify(english?.cases[row.task_id] || {})].join(" ").toLowerCase()]));
  const pageSize = 12;
  const t = (key) => text[state.lang][key] ?? text.en[key] ?? key;
  const processName = (p) => state.lang === "zh" ? p.zh : p.name;
  const className = (c) => state.lang === "zh" ? classZh[c.ID] || c.GeoTask : c.GeoTask;
  const caseField = (row,key) => state.lang === "en" ? english?.cases[row.task_id]?.[key] ?? row.source[key] ?? row.input[key]?.text : row.source[key] ?? row.input[key]?.text;
  const operationField = (row,op,key) => state.lang === "en" ? english?.cases[row.task_id]?.operations?.[op.o_id]?.[key] ?? op[key] : op[key];
  const mappingText = (op) => state.lang === "en" ? t("mappingSummary").replace("{categories}",op.class_ids.map(id=>`${id} (${className(classMap.get(id))})`).join("; ")) : op.rationale;
  const color = (id) => processInfo.find(p => p.id === id[0])?.color || "#47755c";
  const badge = (id, mini=false) => `<span class="${mini ? "mini-badge" : "label-chip"}" style="--process-color:${color(id)}" title="${escape(classMap.get(id) ? className(classMap.get(id)) : id)}">${escape(id)}</span>`;
  const filtered = () => data.cases.filter(row => (!state.query || searchable.get(row.task_id).includes(state.query.toLowerCase().trim())) && (!state.process || row.reference.class_ids.some(id => id[0] === state.process)) && (!state.category || row.reference.class_ids.includes(state.category)));
  let toastTimer;

  function toast(message) {
    clearTimeout(toastTimer); $("toast").textContent = message; $("toast").classList.add("visible");
    toastTimer = setTimeout(() => $("toast").classList.remove("visible"), 2800);
  }
  function safeUrl(raw) {
    try { const url = new URL(raw); return ["https:","http:"].includes(url.protocol) ? url.href : null; } catch (_) { return null; }
  }
  function updateUrl() {
    try { const url=new URL(location.href); if(state.active)url.searchParams.set("case",state.active); else url.searchParams.delete("case"); url.searchParams.set("lang",state.lang); history.replaceState(null,"",url); } catch (_) {}
  }
  function translate() {
    document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
    document.title = state.lang === "zh" ? "MineralExp · 地学实验规划评测" : "MineralExp · Geoscience Experimental Planning";
    document.querySelectorAll("[data-i18n]").forEach(node => { node.innerHTML=t(node.dataset.i18n); });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(node => { node.placeholder=t(node.dataset.i18nPlaceholder); });
    $("language-toggle").textContent = state.lang === "zh" ? "EN" : "ZH";
    $("language-toggle").setAttribute("aria-label",state.lang === "zh" ? "切换为英文" : "Switch to Simplified Chinese");
    $("case-search").setAttribute("aria-label",t("searchPlaceholder"));
    $("process-filter").setAttribute("aria-label",t("processLabel"));
    $("class-filter").setAttribute("aria-label",t("classLabel"));
    $("previous-page").setAttribute("aria-label",state.lang === "zh" ? "上一页" : "Previous page");
    $("next-page").setAttribute("aria-label",state.lang === "zh" ? "下一页" : "Next page");
    const snapshot=$("snapshot-link"); snapshot.href=`${data.meta.repository}/tree/${data.meta.commit}`;
    snapshot.textContent=`${t("snapshot")} ${data.meta.commit.slice(0,7)} ↗`;
    $("model-source-link").href=`${data.meta.repository}/blob/${data.meta.commit}/${data.model_example.source_path}`;
    $("model-labels").textContent=data.model_example.response.labels.join(" + ");
    for (const key of ["cases","classes","operations","processes"]) $("stat-"+key).textContent = data.stats[key].toLocaleString("en-US");
    $("mean-labels").textContent=data.stats.mean_labels.toFixed(2);
    renderFilters(); renderChart(); renderFeatured(); renderCases(); renderExample();
  }
  function renderFilters() {
    $("process-filter").innerHTML=`<option value="">${escape(t("allProcesses"))}</option>` + processInfo.map(p=>`<option value="${p.id}">${escape(processName(p))}</option>`).join("");
    $("process-filter").value=state.process;
    $("class-filter").innerHTML=`<option value="">${escape(t("allClasses"))}</option>`+classes.filter(c=>!state.process || c.ID[0]===state.process).map(c=>`<option value="${c.ID}">${c.ID} · ${escape(className(c))}</option>`).join("");
    $("class-filter").value=state.category;
  }
  function renderChart() {
    const isClass=state.chart === "class";
    $("chart-process").classList.toggle("active",!isClass); $("chart-class").classList.toggle("active",isClass);
    $("chart-process").setAttribute("aria-pressed",String(!isClass)); $("chart-class").setAttribute("aria-pressed",String(isClass));
    $("coverage-chart").classList.toggle("class-chart",isClass);
    const items = isClass ? classes.map(c=>({id:c.ID,label:className(c),count:data.stats.class_counts[c.ID],process:c.ID[0]})) : processInfo.map(p=>({id:p.id,label:processName(p),count:data.stats.process_counts[p.name],process:p.id}));
    $("coverage-chart").innerHTML=items.map(item=>`<button class="coverage-row${item.count===0?" zero":""}" type="button" data-chart-id="${item.id}" style="--process-color:${color(item.id)}" aria-label="${escape(item.id+" "+item.label+": "+item.count+" / "+data.stats.cases)}" title="${escape(item.label)}"><span class="coverage-label"><span class="process-code">${item.id}</span><span>${escape(item.label)}</span></span><span class="bar-track" aria-hidden="true"><span class="bar-fill" style="width:${100*item.count/data.stats.cases}%"></span></span><span class="bar-value">${item.count}</span></button>`).join("");
    $("chart-footnote").textContent=t(isClass?"chartClassNote":"chartProcessNote");
  }
  function renderFeatured() {
    const liba=data.cases.find(row=>/李坝|\bliba\b/i.test(searchable.get(row.task_id)));
    const presets=[{id:"G19-0002",label:t("bayan")},{id:"G19-0161",label:t("upb")},...(liba?[{id:liba.task_id,label:t("liba")}]:[])].filter(item=>byId.has(item.id));
    $("featured-cases").innerHTML=presets.map(item=>`<button class="featured-case" type="button" data-featured="${item.id}">${escape(item.label)} <span aria-hidden="true">↗</span></button>`).join("");
  }
  function renderCases() {
    const rows=filtered();
    const pages=Math.max(1,Math.ceil(rows.length/pageSize)); state.page=Math.min(state.page,pages);
    if(!rows.some(row=>row.task_id===state.active))state.active=rows[0]?.task_id || null;
    $("result-count").textContent=state.lang==="zh" ? `${rows.length} / ${data.stats.cases} 个案例` : `${rows.length} of ${data.stats.cases} cases`;
    const start=(state.page-1)*pageSize;
    const oldScroll=$("case-list").scrollTop;
    $("case-list").innerHTML=rows.length ? rows.slice(start,start+pageSize).map(row=>`<button class="case-item${row.task_id===state.active?" active":""}" type="button" data-case-id="${escape(row.task_id)}" aria-pressed="${row.task_id===state.active}"><span class="case-item-meta"><span class="mono">${escape(row.task_id)}</span><span>${escape(row.source.year || "—")}</span></span><span class="case-item-title">${escape(caseField(row,"title"))}</span><span class="case-item-bottom">${row.reference.class_ids.map(id=>badge(id,true)).join("")}</span></button>`).join("") : `<div class="empty-state">${escape(t("noResults"))}<br>${escape(t("noCaseHint"))}</div>`;
    $("case-list").scrollTop=oldScroll;
    $("page-info").textContent=state.lang==="zh" ? `第 ${state.page} / ${pages} 页` : `Page ${state.page} / ${pages}`;
    $("previous-page").disabled=state.page===1; $("next-page").disabled=state.page>=pages;
    updateUrl();
    renderCase();
  }
  function renderCase() {
    const row=byId.get(state.active);
    const tabs=document.querySelectorAll(".case-tabs [data-tab]");
    tabs.forEach(button=>{button.disabled=!row;button.classList.toggle("active",button.dataset.tab===state.tab);button.setAttribute("aria-selected",String(button.dataset.tab===state.tab));button.tabIndex=button.dataset.tab===state.tab?0:-1;});
    $("case-content").setAttribute("aria-labelledby","tab-"+state.tab);
    if(!row) { $("case-heading").innerHTML=`<div class="empty-state">${escape(t("selectCase"))}</div>`; $("case-content").innerHTML=""; return; }
    const source=row.source;
    const publicationUrl=safeUrl(source.official_landing_url) || (source.doi ? safeUrl("https://doi.org/"+source.doi) : null);
    $("case-heading").innerHTML=`<div class="case-title-meta"><span class="mono">${escape(row.task_id)} / ${escape(source.year || "—")}</span><div class="case-tools"><button class="icon-action" id="share-case" type="button">${escape(t("share"))} ↗</button><button class="icon-action" id="download-case" type="button">${escape(t("downloadCase"))}</button></div></div><h3 class="case-publication">${escape(caseField(row,"title"))}</h3><div class="case-source"><span>${escape(caseField(row,"venue") || t("source"))}</span>${publicationUrl?`<a href="${escape(publicationUrl)}" target="_blank" rel="noopener noreferrer">${escape(t("sourceLink"))} ↗</a>`:""}</div>${state.lang==="en"?`<p class="translation-note">${escape(t("readingNotice"))}</p>`:""}`;
    if(state.tab === "input") {
      $("case-content").innerHTML=`<div class="hypothesis-block"><span class="field-label">${escape(t("hypothesis"))}</span><p>${escape(caseField(row,"hypothesis"))}</p></div><div class="input-field"><span class="field-label">${escape(t("initialInformation"))}</span><p>${escape(caseField(row,"initial_information"))}</p></div><div class="input-field"><span class="field-label">${escape(t("availableConditions"))}</span><p>${escape(caseField(row,"available_conditions"))}</p></div><p class="input-note">${escape(t("agentOnly"))}</p>`;
    } else if(state.tab === "reference") {
      $("case-content").innerHTML=`<div class="reference-heading"><div><h4>${escape(t("referenceUnion"))}</h4><p>${row.reference.O.length} ${escape(t("operationCount"))}</p></div><div class="label-chips">${row.reference.class_ids.map(id=>badge(id)).join("")}</div></div><p class="small muted" style="margin-bottom:18px">${escape(t("operationsNote"))}</p>` + row.reference.O.map(o=>`<section class="operation-card"><div class="operation-top"><h4><span class="operation-id">${escape(o.o_id)}</span>${escape(operationField(row,o,"original_description"))}</h4><div class="label-chips">${o.class_ids.map(id=>badge(id)).join("")}</div></div><dl><dt>${escape(t("purpose"))}</dt><dd>${escape(operationField(row,o,"original_purpose") || "—")}</dd><dt>${escape(t("material"))}</dt><dd>${escape(operationField(row,o,"original_material") || "—")}</dd></dl><details><summary>${escape(t("mappingReason"))}</summary><p>${escape(mappingText(o) || "—")}</p></details></section>`).join("");
    } else {
      $("case-content").innerHTML=`<div class="json-toolbar"><span>${escape(t("recordJson"))}</span><button class="icon-action" id="copy-case-json" type="button">${escape(t("copyJson"))}</button></div><pre class="json-code" id="record-json"></pre>`;
      $("record-json").textContent=JSON.stringify(row,null,2);
    }
  }
  function renderExample() {
    const selections=data.model_example.response.class_predictions.filter(item=>item.selected).map(item=>state.lang==="en" ? {...item,...english?.model_example.class_predictions.find(translated=>translated.class_id===item.class_id)} : item);
    if(!selections.some(item=>item.class_id===state.exampleClass))state.exampleClass=selections[0]?.class_id;
    $("example-class-tabs").innerHTML=selections.map(item=>`<button type="button" data-example-class="${escape(item.class_id)}" class="${item.class_id===state.exampleClass?"active":""}" aria-pressed="${item.class_id===state.exampleClass}">${escape(item.class_id)}</button>`).join("");
    const decision=selections.find(item=>item.class_id===state.exampleClass);
    if(!decision){$("example-design").textContent=t("exampleNoOutput");return;}
    $("example-design").innerHTML=`<p class="small muted" style="margin-bottom:13px">${escape(t("originalText"))}</p><div class="design-rationale"><strong>${escape(t("selectionReason"))}</strong>${escape(decision.rationale)}</div>` + decision.experiments.map(item=>`<h3 class="design-name">${escape(item.name)}</h3>`+["design","why_needed","expected_evidence","supports_hypothesis_if","weakens_hypothesis_if","limitations"].map(field=>`<section class="design-section"><h4>${escape(t(field))}</h4><p>${escape(item[field])}</p></section>`).join("")).join("");
  }
  function changeFilters() {
    state.page=1; $("case-list").scrollTop=0; renderFilters(); renderCases();
  }
  function reset() {
    state.query="";state.process="";state.category="";$("case-search").value="";changeFilters();
  }
  function selectCase(id,featured=false) {
    if(!byId.has(id))return;
    if(featured){state.query="";state.process="";state.category="";$("case-search").value="";state.tab="input";}
    state.active=id;
    const index=filtered().findIndex(row=>row.task_id===id);state.page=Math.floor(Math.max(0,index)/pageSize)+1;
    renderFilters();renderCases();updateUrl();$("case-content").scrollTop=0;
    if(featured)$("explore").scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});
    else if(matchMedia("(max-width: 600px)").matches)$("case-detail").scrollIntoView({behavior:"smooth",block:"start"});
  }
  function download(contents,filename,type) {
    const url=URL.createObjectURL(new Blob([contents],{type}));const a=document.createElement("a");a.href=url;a.download=filename;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  async function copy(contents) {
    try { await navigator.clipboard.writeText(contents);toast(t("copied")); } catch (_) { toast(t("copyFailed")); }
  }

  $("language-toggle").addEventListener("click",()=>{state.lang=state.lang==="en"?"zh":"en";try{localStorage.setItem("mineralexp-language",state.lang);}catch(_){}translate();updateUrl();});
  $("chart-process").addEventListener("click",()=>{state.chart="process";renderChart();});
  $("chart-class").addEventListener("click",()=>{state.chart="class";renderChart();});
  $("coverage-chart").addEventListener("click",event=>{const button=event.target.closest("[data-chart-id]");if(!button)return;state.query="";$("case-search").value="";state.process=button.dataset.chartId[0];state.category=state.chart==="class"?button.dataset.chartId:"";state.tab="reference";changeFilters();$("explore").scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});});
  $("case-search").addEventListener("input",event=>{state.query=event.target.value;changeFilters();});
  $("process-filter").addEventListener("change",event=>{state.process=event.target.value;state.category="";changeFilters();});
  $("class-filter").addEventListener("change",event=>{state.category=event.target.value;changeFilters();});
  $("clear-filters").addEventListener("click",reset);
  $("featured-cases").addEventListener("click",event=>{const button=event.target.closest("[data-featured]");if(button)selectCase(button.dataset.featured,true);});
  $("case-list").addEventListener("click",event=>{const button=event.target.closest("[data-case-id]");if(button)selectCase(button.dataset.caseId);});
  $("previous-page").addEventListener("click",()=>{state.page--;$("case-list").scrollTop=0;renderCases();});
  $("next-page").addEventListener("click",()=>{state.page++;$("case-list").scrollTop=0;renderCases();});
  document.querySelector(".case-tabs").addEventListener("click",event=>{const button=event.target.closest("[data-tab]");if(!button || button.disabled)return;state.tab=button.dataset.tab;renderCase();$("case-content").scrollTop=0;});
  document.querySelector(".case-tabs").addEventListener("keydown",event=>{
    if(!["ArrowLeft","ArrowRight","Home","End"].includes(event.key))return;
    const buttons=[...document.querySelectorAll(".case-tabs [data-tab]")].filter(button=>!button.disabled);if(!buttons.length)return;
    event.preventDefault();const current=buttons.findIndex(button=>button.dataset.tab===state.tab);
    const next=event.key==="Home"?0:event.key==="End"?buttons.length-1:(current+(event.key==="ArrowRight"?1:-1)+buttons.length)%buttons.length;
    state.tab=buttons[next].dataset.tab;renderCase();buttons[next].focus();
  });
  $("case-detail").addEventListener("click",event=>{
    if(event.target.closest("#download-case")){const row=byId.get(state.active);if(row)download(JSON.stringify(row,null,2)+"\n",row.task_id+".json","application/json;charset=utf-8");}
    if(event.target.closest("#copy-case-json")){const row=byId.get(state.active);if(row)copy(JSON.stringify(row,null,2));}
    if(event.target.closest("#share-case")){if(location.protocol==="file:"){toast(t("shareLocal"));return;}updateUrl();copy(location.href);}
  });
  $("example-class-tabs").addEventListener("click",event=>{const button=event.target.closest("[data-example-class]");if(button){state.exampleClass=button.dataset.exampleClass;renderExample();$("example-design").scrollTop=0;}});
  $("download-dataset").addEventListener("click",()=>{download(data.cases.map(row=>JSON.stringify(row)).join("\n")+"\n","MineralExp-GeoTask19-"+data.meta.commit.slice(0,7)+".jsonl","application/x-ndjson;charset=utf-8");toast(t("downloaded"));});
  $("copy-command").addEventListener("click",()=>copy($("quickstart-code").textContent));
  const initialIndex=data.cases.findIndex(row=>row.task_id===state.active);state.page=Math.floor(Math.max(0,initialIndex)/pageSize)+1;
  translate();
  // Read-only inspection hook for local QA; no backend or secret state.
  window.MineralExpApp={getState:()=>({...state}),getStats:()=>structuredClone(data.stats),getFilteredIds:()=>filtered().map(row=>row.task_id)};
})();
