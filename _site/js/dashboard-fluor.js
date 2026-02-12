// dashboard-fluor.js - 针对荧光页面(fluorescence.html)的 Dashboard 补丁脚本
// 仅在该页面中引入，以避免影响首页(index.html) 的默认行为
// 主要功能：
// 1. 在数据加载阶段，把每条记录的 mechanisms 字段映射为 category，复用原有类别图逻辑
// 2. 重写 TableModule.updateDataTable，使其列顺序与荧光页面一致
// 3. 其他页面继续使用原版 dashboard-main.js，不受影响

(function () {
    if (typeof DataModule === 'undefined') {
        console.error('DataModule 未定义，dashboard-fluor.js 无法应用补丁');
        return;
    }

    // --- 重写 DataModule.loadData ---
    const originalLoadData = DataModule.loadData;
    DataModule.loadData = async function () {
        try {
            const dataPath = window.DASHBOARD_CONFIG?.dataPath || '/apidata/immunedata_cleaned.json';
            const response = await fetch(dataPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // 将 mechanisms 字段映射到 category，复用原有类别(饼图)逻辑
            //data.forEach(d => {
            //    if (d.mechanisms !== undefined && d.mechanisms !== null) {
            //        d.category = d.mechanisms;
            //    }
            //});

            // 保存到全局数据
            originalData = data;
            filteredData = [...data];

            //console.log('荧光数据加载成功，共', data.length, '条记录');

            // 初始化各模块
            this.updateStatistics();
            ChartModule.createAllCharts();
            UIModule.updateDataSummary();
            FilterModule.updateFilterTags();
            TableModule.updateDataTable();
        } //catch (error) {
          //  console.error('荧光数据加载失败:', error);
          //  this.showLoadingError(error.message);
        //}
    };

    // --- 重写 TableModule.updateDataTable ---
    if (typeof TableModule !== 'undefined') {
        TableModule.updateDataTable = function () {
            const tableBody = document.getElementById('tableBody');
            const tableInfo = document.getElementById('tableInfo');

            if (!tableBody || !tableInfo) {
                console.warn('表格元素缺失，无法更新数据表');
                return;
            }

            tableInfo.textContent = `Showing ${filteredData.length} records (out of ${originalData.length} total)`;
            tableBody.innerHTML = '';

            // 辅助函数
            const colorizeSequence = (seq) => {
                const colorMap = { 'A': '#d9534f', 'T': '#f0ad4e', 'U': '#f0ad4e', 'C': '#5bc0de', 'G': '#5cb85c' };
                return seq.split('').map(ch => `<span style="color:${colorMap[ch.toUpperCase()] || '#333'}">${ch}</span>`).join('');
            };

            const addTooltip = (cell, htmlContent) => {
                if (!htmlContent) return;
                cell.style.cursor = 'pointer';
                
                cell.addEventListener('mouseenter', (e) => {
                    showAmirTooltip(htmlContent, e.clientX, e.clientY);
                });
                cell.addEventListener('mousemove', (e) => {
                    // 实时跟随鼠标移动
                    showAmirTooltip(htmlContent, e.clientX, e.clientY);
                });
                cell.addEventListener('mouseleave', hideAmirTooltip);
            };

            filteredData.forEach((item, index) => {
                const row = document.createElement('tr');
                row.style.whiteSpace = 'nowrap';


                // DOI 列
                let doiHTML = item.doi;
                if (item.more_info && item.more_info.trim() !== '') {
                    doiHTML = `<a href="${item.more_info}" target="_blank">${item.doi}</a>`;
                }

                // Name
                const nameShort = item.name.split(',')[0].trim();
                const nameFull = item.name;

                // Year
                const yearShort = item.year.split(',')[0].trim();
                const yearFull = item.year;

                // Title
                const titleShort = item.title.split(',')[0].trim();
                const titleFull = item.title;

                // seq_method
                const seq_methodShort = item.seq_method.split(',')[0].trim();
                const seq_methodFull = item.seq_method;

                //Accession_code
                const Accession_codeShort = (item.Accession_code || '').substring(0, 10) + '...';
                const Accession_codeFullColored = colorizeAccession_code(item.Accession_code || '');

                // Project_ID
                const Project_IDShort = (item.Project_ID || '').split(',')[0].trim();
                const Project_IDFull = item.Project_ID || '';

                // Species
                const speciesShort = (item.species || '').split(',')[0].trim();
                const speciesFull = item.species || '';

                // Donor_status
                const donorShort = (item.Donor_status || '').split(',')[0].trim();
                const donorFull = item.Donor_status || '';

                // Region
                const regionShort = (item.region || '').split(',')[0].trim();
                const regionFull = item.region || '';

                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${doiHTML}</td>
                    <td>${nameFull}</td>
                    <td>${yearFull}</td>
                    <td>${titleFull}</td>
                    <td>${seq_methodFull}</td>
                    <td>${Accession_codeShort}</td>
                    <td>${Project_IDFull}</td>
                    <td>${speciesFull}</td>
                    <td>${donorFull}</td>
                    <td>${regionFull}</td>
                `;
                tableBody.appendChild(row);

                const cells = row.querySelectorAll('td');
                // 依次添加 tooltip
                addTooltip(cells[1], doiHTML); // DOI
                addTooltip(cells[4], titleFull); // title
                addTooltip(cells[6], Accession_codeFullColored); // sequence
                addTooltip(cells[9], donorFull); // donor

            });
        };
    }

    const originalUpdateStatistics = DataModule.updateStatistics;
    DataModule.updateStatistics = function() {
        // 复用原函数逻辑，但修正 GC 显示为百分比
        if (!originalData || originalData.length === 0) {
            return;
        }

        if (!filteredData) {
            return;
        }

        const diseases = [...new Set(filteredData.map(d => d.Donor_status))];
        const years = filteredData.length > 0 ? [...new Set(filteredData.map(d => d.Year))] : [];
        const species = [...new Set(filteredData.map(d => d.Species))];
        
        const totalDatasetsEl = document.getElementById('totalDatasets');
        const uniqueSpeciesEl = document.getElementById('uniqueSpecies');
        const yearSpanEl = document.getElementById('yearSpan');
        //const avgGCEl = document.getElementById('avgGC');

        if (totalDatasetsEl) totalDatasetsEl.textContent = filteredData.length;
        if (uniqueSpeciesEl) uniqueSpeciesEl.textContent = Species.length;
        if (yearSpanEl) {
            if (years.length > 0) {
                const yearSpan = Math.max(...years) - Math.min(...years);
                yearSpanEl.textContent = yearSpan + '年';
            } else {
                yearSpanEl.textContent = '0年';
            }
        }

        //if (avgGCEl) {
        //    if (filteredData.length > 0) {
        //        const validGCData = filteredData.filter(d => d.gc_content !== undefined && d.gc_content !== null && !isNaN(d.gc_content));
        //        if (validGCData.length > 0) {
        //            const avgGC = validGCData.reduce((sum, d) => sum + d.gc_content, 0) / validGCData.length * 100;
        //            avgGCEl.textContent = avgGC.toFixed(1) + '%';
        //        } else {
        //            avgGCEl.textContent = '0%';
        //        }
        //    } else {
        //        avgGCEl.textContent = '0%';
        //    }
        //}
    };

    // --- 覆写 ChartModule.createAllCharts：仅生成年份和类别图 ---
    ChartModule.createAllCharts = function () {
        try {
            console.log("[Fluor] 创建年份及类别图表，无散点图...");
            this.createYearChart();
            this.createCategoryChart();
            console.log("[Fluor] 图表创建完成");
        } catch (error) {
            console.error("[Fluor] 创建图表时发生错误:", error);
        }
    };

    // --- 覆写 FilterModule.updateNodeStateIndicators：忽略散点图 ---
    if (typeof FilterModule !== 'undefined') {
        const originalUpdateNodeStateIndicators = FilterModule.updateNodeStateIndicators;
        FilterModule.updateNodeStateIndicators = function () {
            // 年份图状态
            const yearChartEl = document.querySelector('#yearChart');
            const diseaseChartEl = document.querySelector('#diseaseChart');
            if (!yearChartEl || !diseaseChartEl) {
                return; // 元素缺失时直接返回
            }
            const yearChartHeader = yearChartEl.closest('.chart-wrapper').querySelector('.chart-header');
            const diseaseChartHeader = diseaseChartEl.closest('.chart-wrapper').querySelector('.chart-header');

            const yearStateIndicator = yearChartHeader.querySelector('.node-state-indicator') || document.createElement('div');
            yearStateIndicator.className = 'node-state-indicator';
            const diseaseStateIndicator = diseaseChartHeader.querySelector('.node-state-indicator') || document.createElement('div');
            diseaseStateIndicator.className = 'node-state-indicator';

            // 清除状态
            yearStateIndicator.textContent = '';
            diseaseStateIndicator.textContent = '';

            // 根据交互顺序填充状态（仅 A/B 两层）
            nodeInteractionOrder.forEach((nodeId, index) => {
                const stateText = index === 0 ? 'Node A' : 'Node B';
                if (nodeId === 'yearChart') {
                    yearStateIndicator.textContent = stateText;
                    yearStateIndicator.style.backgroundColor = '#520049';
                } else if (nodeId === 'diseaseChart') {
                    diseaseStateIndicator.textContent = stateText;
                    diseaseStateIndicator.style.backgroundColor = '#520049';
                }
            });

            // 附加到 DOM
            if (!yearChartHeader.querySelector('.node-state-indicator')) {
                yearChartHeader.appendChild(yearStateIndicator);
            }
            if (!diseaseChartHeader.querySelector('.node-state-indicator')) {
                diseaseChartHeader.appendChild(diseaseStateIndicator);
            }
        };
    }

    console.log('dashboard-fluor.js 补丁已应用');
})(); 