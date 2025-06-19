export const grammarLevelTabs = {
  firstTab : { title: 'Beginner', icon: 'academic'},
  secondTab : { title: 'Intermediate', icon: 'trophy'},
  thirdTab : { title: 'Advanced', icon: 'rocket'}
}

export const optionWords: ECOption = {
    title: {
      text: "Out of 3K words",
      // subtext: "5K most common words",
      left: "center",
      top: "5%",
      textStyle: {
        fontSize: 18,
        fontWeight: 400,
        color: "#1f2937"
      },
      subtextStyle: {
        fontSize: 12,
        color: "#6b7280"
      }
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      borderColor: "#e5e7eb",
      borderWidth: 1,
      textStyle: {
        color: "#374151"
      },
      extraCssText: "box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1); border-radius: 8px;"
    },
    legend: {
      orient: "vertical",
      left: "left",
      top: "middle",
      itemGap: 12,
      itemWidth: 12,
      itemHeight: 12,
      textStyle: {
        fontSize: 12,
        color: "#6b7280"
      },
      formatter: function(name) {
        const data = (optionWords.series as any[])[0]?.data || [];
        const item = data.find((item: any) => item.name === name);
        return item ? `${name}: ${item.value}` : name;
      }
    },
    series: [
      {
        name: "Vocabulary",
        type: "pie",
        radius: ["45%", "75%"],
        center: ["65%", "55%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 8,
          borderColor: "#ffffff",
          borderWidth: 3,
          shadowBlur: 10,
          shadowColor: "rgba(0, 0, 0, 0.1)"
        },
        label: {
          show: false
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 20,
            shadowColor: "rgba(0, 0, 0, 0.2)"
          }
        },
        labelLine: {
          show: false
        },
        data: [
          {
            value: 1048,
            name: "Mastered",
            itemStyle: { 
              color: "#10b981",
              shadowColor: "rgba(16, 185, 129, 0.3)"
            }
          },
          {
            value: 735,
            name: "Learning",
            itemStyle: { 
              color: "#f59e0b",
              shadowColor: "rgba(245, 158, 11, 0.3)"
            }
          },
          {
            value: 580,
            name: "To Learn",
            itemStyle: { 
              color: "#ef4444",
              shadowColor: "rgba(239, 68, 68, 0.3)"
            }
          },
        ],
      },
    ],
  };
  
export const optionExpressions: ECOption = {
    title: {
      text: "Out of 2K expressions",
      // subtext: "3K most common expressions",
      left: "center",
      top: "5%",
      textStyle: {
        fontSize: 18,
        fontWeight: 400,
        color: "#1f2937"
      },
      subtextStyle: {
        fontSize: 12,
        color: "#6b7280"
      }
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      borderColor: "#e5e7eb",
      borderWidth: 1,
      textStyle: {
        color: "#374151"
      },
      extraCssText: "box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1); border-radius: 8px;"
    },
    legend: {
      orient: "vertical",
      left: "left",
      top: "middle",
      itemGap: 12,
      itemWidth: 12,
      itemHeight: 12,
      textStyle: {
        fontSize: 12,
        color: "#6b7280"
      },
      formatter: function(name) {
        const data = (optionExpressions.series as any[])[0]?.data || [];
        const item = data.find((item: any) => item.name === name);
        return item ? `${name}: ${item.value}` : name;
      }
    },
    series: [
      {
        name: "Expressions",
        type: "pie",
        radius: ["45%", "75%"],
        center: ["65%", "55%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 8,
          borderColor: "#ffffff",
          borderWidth: 3,
          shadowBlur: 10,
          shadowColor: "rgba(0, 0, 0, 0.1)"
        },
        label: {
          show: false
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 20,
            shadowColor: "rgba(0, 0, 0, 0.2)"
          }
        },
        labelLine: {
          show: false
        },
        data: [
          {
            value: 648,
            name: "Mastered",
            itemStyle: { 
              color: "#8b5cf6",
              shadowColor: "rgba(139, 92, 246, 0.3)"
            }
          },
          {
            value: 435,
            name: "Learning",
            itemStyle: { 
              color: "#06b6d4",
              shadowColor: "rgba(6, 182, 212, 0.3)"
            }
          },
          {
            value: 380,
            name: "To Learn",
            itemStyle: { 
              color: "#f97316",
              shadowColor: "rgba(249, 115, 22, 0.3)"
            }
          },
        ],
      },
    ],
  };
  
export const optionGrammar: ECOption = {
    title: {
      text: "Grammar Progress",
      // subtext: "Weekly grammar exercises completed",
      left: "center",
      top: "5%",
      textStyle: {
        fontSize: 18,
        fontWeight: 600,
        color: "#1f2937"
      },
      subtextStyle: {
        fontSize: 12,
        color: "#6b7280"
      }
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      borderColor: "#e5e7eb",
      borderWidth: 1,
      textStyle: {
        color: "#374151"
      },
      extraCssText: "box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1); border-radius: 8px;",
      formatter: function(params: any) {
        const data = params[0];
        return `<div class="font-semibold">${data.name}</div>
                <div class="text-sm">Exercises: <span class="font-medium">${data.value}</span></div>`;
      }
    },
    grid: {
      left: "10%",
      right: "10%",
      top: "20%",
      bottom: "15%",
      containLabel: true
    },
    xAxis: {
      type: "category",
      data: ["Rule1", "Rule2", "Rule3", "Rule4", "Rule5", "Rule6", "Rule7", "Rule8", "Rule9", "Rule10"],
      axisLine: {
        lineStyle: {
          color: "#e5e7eb"
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: "#6b7280",
        fontSize: 12,
        fontWeight: 500
      }
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 100,
      interval: 50,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: "#f3f4f6",
          type: "dashed"
        }
      },
      axisLabel: {
        color: "#6b7280",
        fontSize: 12,
        fontWeight: 500
      }
    },
    series: [
      {
        name: "Grammar Exercises",
        type: "bar",
        data: [100, 20, 50, 30, 70, 0, 10, 30, 40, 55],
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.1)",
          borderRadius: [4, 4, 0, 0]
        },
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#8b5cf6"
              },
              {
                offset: 1,
                color: "#7c3aed"
              }
            ]
          },
          borderRadius: [4, 4, 0, 0],
          shadowBlur: 10,
          shadowColor: "rgba(139, 92, 246, 0.2)"
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 20,
            shadowColor: "rgba(139, 92, 246, 0.4)"
          }
        }
      }
    ]
  };
  