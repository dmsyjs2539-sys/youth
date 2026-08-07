/*
 * 연구 자료 데이터 — 목록(research_list.html), 상세(research_report.html),
 * 메인 최신 연구보고서(index.html)가 모두 이 하나를 바라본다.
 * 제목이나 내용을 고칠 때 여기만 고치면 세 곳에 함께 반영된다.
 *
 * 본문은 Figma 시안(연구보고서01~03)에 적힌 내용을 그대로 옮긴 것이다.
 */
(function (global) {
    "use strict";

    var REPORTS = [
        {
            id: "ai_competency",
            code: "연구보고25-수시05",
            series: "미래교육연구",
            title: "AI 시대, 청년에게 요구되는 핵심 역량과 미래교육의 방향",
            headline: "AI 시대, 청년에게 요구되는\n핵심 역량과 미래교육의 방향",
            authors: "김혁진 · 이서현",
            published: "2025. 12. 31.",
            cover: "assets/images/unsplash_qQT7l54ERZM.png",
            keywords: [
                "AI 시대",
                "미래교육",
                "청년 역량",
                "메타인지",
                "자기주도학습",
                "평생학습",
                "핵심역량",
                "디지털 전환",
                "교육혁신",
                "인적자원개발(HRD)",
            ],
            abstract: [
                "인공지능(AI)의 급속한 발전은 산업구조와 고용환경, 교육체계를 근본적으로 변화시키고 있으며, 단순 지식과 기술 중심의 인재보다 스스로 학습하고 변화에 적응할 수 있는 역량을 갖춘 인재를 요구하고 있다. 이에 따라 미래 사회에서는 문제해결력, 창의성, 메타인지, 자기주도성, 협업 능력 등 인간 고유의 역량이 핵심 경쟁력으로 부상하고 있다.",
                "본 연구는 AI 시대의 노동시장 변화와 미래 인재상에 관한 국내외 연구를 종합적으로 분석하고, 세계경제포럼(WEF), OECD, UNESCO 등 국제기구가 제시하는 핵심역량을 비교·분석하였다. 또한 글로벌 기업의 인재개발(HRD) 전략과 해외 교육 혁신 사례를 검토하여 미래 교육이 지향해야 할 방향을 도출하였다.",
                "연구 결과, 미래교육은 단순한 지식 전달을 넘어 자기이해와 메타인지를 기반으로 한 학습자 중심 교육으로 전환되어야 하며, 청년들이 스스로 진로를 설계하고 변화하는 사회에 능동적으로 대응할 수 있는 교육체계가 필요함을 확인하였다. 특히 AI 시대에는 디지털 역량과 함께 내적 동기, 자기성찰, 회복탄력성 등 인간 고유의 역량을 체계적으로 함양할 수 있는 교육 프로그램이 중요하며, 이를 지원하기 위한 교육 콘텐츠 개발과 정책적 지원이 병행되어야 한다.",
                "본 연구는 미래 청년교육의 방향성을 제시하고, 대학·기업·평생교육기관에서 활용 가능한 메타인지 기반 교육모델 개발의 기초자료를 제공하는 데 의의가 있다.",
            ],
            meta: [
                "참고문헌",
                "부록",
                "국문",
                "초록",
                "Abstract유형",
                "Research Report",
                "소속 컬렉션연구보고서 > 미래교육연구 시리즈",
            ],
            toc: [
                { text: "Ⅰ. 서론", part: true },
                { text: "1. 연구의 필요성 및 목적", part: false },
                { text: "2. 연구 내용 및 방법", part: false },
                { text: "3. 보고서의 구성", part: false },
                { text: "Ⅱ. AI 시대와 미래 인재상의 변화", part: true },
                { text: "1. AI 기술 발전과 노동시장 변화", part: false },
                { text: "2. 세계경제포럼(WEF)이 제시한 미래 핵심역량", part: false },
                { text: "3. OECD·UNESCO 미래교육 방향", part: false },
                { text: "4. 글로벌 기업의 HRD 전략 변화", part: false },
                { text: "5. 시사점", part: false },
                { text: "Ⅲ. 미래교육의 핵심 역량 분석", part: true },
                { text: "1. 메타인지와 자기주도학습", part: false },
                { text: "2. 창의성과 문제해결 역량", part: false },
                { text: "3. 협업 및 의사소통 역량", part: false },
                { text: "4. 디지털 리터러시와 AI 활용 역량", part: false },
                { text: "5. 회복탄력성과 내적 동기", part: false },
                { text: "6. 미래교육 핵심역량 종합 분석", part: false },
                { text: "Ⅳ. 미래청년교육 모델 제안", part: true },
                { text: "1. 미래청년교육의 교육철학", part: false },
                { text: "2. 메타인지 기반 교육모델", part: false },
                { text: "3. 미래청년교육 5단계 학습모델", part: false },
                { text: "4. 교육 프로그램 운영 방향", part: false },
                { text: "5. 교육 IP 개발 전략", part: false },
                { text: "Ⅴ. 결론 및 정책 제언", part: true },
                { text: "1. 연구 결과 요약", part: false },
                { text: "2. 교육정책 제언", part: false },
                { text: "3. 대학 및 기업 HRD 적용 방안", part: false },
                { text: "4. 연구의 한계 및 향후 과제", part: false },
            ],
            meta: [
                "참고문헌",
                "부록",
                "국문",
                "초록",
                "Abstract유형",
                "Research Report",
                "소속 컬렉션연구보고서 > 미래교육연구 시리즈",
            ]
        },
        {
            id: "job_readiness",
            code: "연구보고25-수시06",
            series: "청년역량연구",
            title: "청년의 취업 경쟁력 강화를 위한 실무 중심 교육 방안 연구",
            headline: "청년의 취업 경쟁력 강화를 \n위한 실무 중심 교육 방안 연구",
            authors: "박지현 · 장근영",
            published: "2026. 06. 13.",
            cover: "assets/images/card_partner.jpg",
            keywords: [
                "청년 취업",
                "취업 경쟁력",
                "실무역량",
                "직무역량",
                "HRD",
                "산학협력",
                "역량기반 교육",
                "경력개발",
                "취업교육",
                "미래인재",
            ],
            abstract: [
                "청년 고용시장은 디지털 전환과 산업구조 변화의 영향으로 직무 전문성과 실무 수행 능력을 동시에 갖춘 인재를 요구하고 있다. 그러나 대학 교육과 실제 산업 현장에서 요구되는 역량 간의 차이는 여전히 존재하며, 많은 청년들이 졸업 이후 취업 준비 과정에서 실무 경험과 직무 이해 부족으로 어려움을 겪고 있다.",
                "본 연구는 국내외 청년 고용 환경과 기업의 채용 동향을 분석하고, 기업 인사담당자 및 HRD 전문가가 요구하는 핵심 직무역량을 중심으로 실무 중심 교육의 방향을 제시하였다. 또한 대학, 기업, 평생교육기관의 우수 사례를 비교·분석하여 청년들의 취업 경쟁력을 높일 수 있는 교육 프로그램의 구성 요소와 운영 전략을 도출하였다.",
                "연구 결과, 효과적인 취업교육은 단순한 자격증 취득이나 취업 정보 제공을 넘어 프로젝트 기반 학습(Project-Based Learning), 현장 문제 해결 경험, 협업 역량, 커뮤니케이션 능력, 자기주도적 학습 역량을 함께 강화하는 방향으로 설계되어야 함을 확인하였다. 특히 산업 현장의 요구를 반영한 교육과정과 진로 설계 교육을 유기적으로 연계하는 것이 청년들의 직무 적응력과 고용 가능성을 높이는 핵심 요인으로 나타났다.",
                "본 연구는 청년 대상 실무 중심 교육모델을 제안하고, 대학·기업·청년기관에서 활용 가능한 취업역량 강화 프로그램 개발의 기초자료를 제공하는 데 목적이 있다.",
            ],
            meta: [
                "참고문헌",
                "부록",
                "국문초록",
                "Abstract",
                "유형",
                "Research Report",
                "소속 컬렉션",
                "연구보고서 > 청년역량연구 시리즈",
            ],
            toc: [
                { text: "Ⅰ. 서론", part: true },
                { text: "1. 연구의 필요성 및 목적", part: false },
                { text: "2. 연구 내용 및 방법", part: false },
                { text: "3. 보고서의 구성", part: false },
                { text: "Ⅱ. 청년 고용환경 변화와 취업교육의 현황", part: true },
                { text: "1. 국내 청년 고용시장 변화", part: false },
                { text: "2. 산업구조 변화와 기업의 인재 수요", part: false },
                { text: "3. 청년 취업교육의 현황과 한계", part: false },
                { text: "4. 국내외 취업교육 사례 분석", part: false },
                { text: "5. 시사점", part: false },
                { text: "Ⅲ. 실무 중심 교육의 핵심 요소 분석", part: true },
                { text: "1. 기업이 요구하는 핵심 직무역량", part: false },
                { text: "2. 프로젝트 기반 학습(PBL)의 효과", part: false },
                { text: "3. 직무 경험과 산학협력 프로그램", part: false },
                { text: "4. 자기주도적 경력개발 역량", part: false },
                { text: "5. 실무형 교육 프로그램 운영 사례", part: false },
                { text: "6. 종합 분석", part: false },
                { text: "Ⅳ. 청년 취업 경쟁력 강화를 위한 교육모델 제안", part: true },
                { text: "1. 실무 중심 교육과정 설계", part: false },
                { text: "2. 대학-기업 연계 교육 운영 방안", part: false },
                { text: "3. 진로 설계 및 취업역량 강화 프로그램", part: false },
                { text: "4. 교육 효과 평가 체계", part: false },
                { text: "5. 교육 IP 활용 및 확산 전략", part: false },
                { text: "Ⅴ. 결론 및 정책 제언", part: true },
                { text: "1. 연구 결과 요약", part: false },
                { text: "2. 청년 취업교육 정책 제언", part: false },
                { text: "3. 대학 및 기업 HRD 적용 방안", part: false },
                { text: "4. 향후 연구 과제", part: false },
            ],
            meta: [
                "참고문헌",
                "부록",
                "국문초록",
                "Abstract",
                "유형",
                "Research Report",
                "소속 컬렉션",
                "연구보고서 > 청년역량연구 시리즈",
            ]
        },
        {
            id: "self_directed",
            code: "연구보고26-정기02",
            series: "미래교육연구",
            title: "청년의 자기주도적 성장을 위한 학습 경험과 교육 환경 연구",
            headline: "청년의 자기주도적 성장을 위한 \n학습 경험과 교육 환경 연구",
            authors: "김혁진 · 이서현",
            published: "2026. 03. 12.",
            cover: "assets/images/unsplash_6jYoil2GhVk.png",
            keywords: [
                "자기주도학습",
                "자기주도성",
                "메타인지",
                "학습경험",
                "교육환경",
                "평생학습",
                "청년교육",
                "성장마인드셋",
                "학습동기",
                "교육혁신",
            ],
            abstract: [
                "급변하는 사회와 기술 환경 속에서 청년에게 요구되는 역량은 단순한 지식 습득을 넘어 스스로 학습 목표를 설정하고, 학습 과정을 성찰하며, 지속적으로 성장할 수 있는 자기주도적 역량으로 확대되고 있다. 그러나 현재의 교육환경은 여전히 평가와 성과 중심의 학습 구조에 머무르는 경우가 많아 청년들이 자기주도적 학습 경험을 충분히 축적하기 어려운 한계를 보이고 있다.",
                "본 연구는 자기주도학습과 메타인지, 학습동기, 성장마인드셋에 관한 국내외 선행연구를 종합적으로 검토하고, 청년들의 학습 경험이 자기주도성과 진로 설계에 미치는 영향을 분석하였다. 또한 대학, 평생교육기관, 기업 교육 프로그램 등 다양한 학습 환경을 비교·분석하여 자기주도적 성장을 촉진하는 교육환경의 핵심 요소를 도출하였다.",
                "연구 결과, 자기주도적 성장은 학습자의 내적 동기와 자기성찰을 기반으로 다양한 실천 경험과 피드백이 반복적으로 이루어질 때 효과적으로 촉진되는 것으로 나타났다. 또한 자율적인 목표 설정, 협력적 학습, 프로젝트 기반 활동, 메타인지 훈련을 포함한 교육환경은 학습 지속성과 자기효능감을 높이는 데 긍정적인 영향을 미치는 것으로 확인되었다.",
                "본 연구는 청년의 자기주도적 성장을 지원하는 교육환경의 방향을 제시하고, 대학, 기업, 청년기관 및 평생교육 현장에서 활용 가능한 메타인지 기반 학습모델 개발을 위한 기초자료를 제공하는 데 의의가 있다.",
            ],
            meta: [
                "참고문헌",
                "부록",
                "국문초록",
                "Abstract",
                "유형",
                "Research Report",
                "소속 컬렉션",
                "연구보고서 > 미래교육연구 시리즈",
            ],
            toc: [
                { text: "Ⅰ. 서론", part: true },
                { text: "1. 연구의 필요성 및 목적", part: false },
                { text: "2. 연구 내용 및 방법", part: false },
                { text: "3. 보고서의 구성", part: false },
                { text: "Ⅱ. 자기주도학습과 미래교육의 이해", part: true },
                { text: "1. 자기주도학습의 개념과 특성", part: false },
                { text: "2. 메타인지와 자기조절학습", part: false },
                { text: "3. 성장마인드셋과 학습동기", part: false },
                { text: "4. 자기주도적 성장의 이론적 기반", part: false },
                { text: "5. 시사점", part: false },
                { text: "Ⅲ. 청년의 학습 경험과 교육환경 분석", part: true },
                { text: "1. 청년 학습 경험의 특성", part: false },
                { text: "2. 대학 및 평생교육 환경 분석", part: false },
                { text: "3. 프로젝트 기반 학습(PBL) 사례", part: false },
                { text: "4. 자기주도적 학습환경의 핵심 요소", part: false },
                { text: "5. 국내외 우수 교육 사례 비교", part: false },
                { text: "6. 종합 분석", part: false },
                { text: "Ⅳ. 자기주도적 성장을 위한 교육모델 제안", part: true },
                { text: "1. 메타인지 기반 학습모델", part: false },
                { text: "2. 자기주도학습 프로그램 설계", part: false },
                { text: "3. 학습 환경 개선 방안", part: false },
                { text: "4. 교육 효과 평가 체계", part: false },
                { text: "5. 미래청년교육 적용 방안", part: false },
                { text: "Ⅴ. 결론 및 정책 제언", part: true },
                { text: "1. 연구 결과 요약", part: false },
                { text: "2. 교육정책 제언", part: false },
                { text: "3. 대학 및 평생교육기관 적용 방안", part: false },
                { text: "4. 향후 연구 과제", part: false },
            ],
            meta: [
                "참고문헌",
                "부록",
                "국문초록",
                "Abstract",
                "유형",
                "Research Report",
                "소속 컬렉션",
                "연구보고서 > 미래교육연구 시리즈",
            ]
        }
    ];

    /* 기존 연구 자료(research.html)는 페이지가 이미 있으므로 목록에서만 참조한다. */
    var LEGACY = [
        {
            id: "metacognition_effect",
            url: "research.html",
            title: "메타인지 기반 청년 교육 프로그램 효과 분석",
            series: "교육 연구",
            authors: "미래청년비전연구소",
            published: "2024. 02. 14.",
            cover: "assets/images/card_research.jpg",
            summary: "메타인지 훈련을 중심으로 설계한 청년 교육 프로그램을 12주간 운영하고, 참여 전후의 자기이해도와 학습 전략 활용도를 비교한 연구입니다."
        }
    ];

    function detailUrl(id) {
        return "research_report.html?id=" + encodeURIComponent(id);
    }

    function findById(id) {
        var found = null;

        REPORTS.forEach(function (report) {
            if (report.id === id) {
                found = report;
            }
        });

        return found;
    }

    /* 목록에 뿌릴 형태로 합친다. 기존 자료가 먼저, 새 보고서가 뒤에 온다. */
    function toListItems() {
        var legacy = LEGACY.map(function (item) {
            return {
                id: item.id,
                url: item.url,
                title: item.title,
                series: item.series,
                authors: item.authors,
                published: item.published,
                cover: item.cover,
                summary: item.summary
            };
        });

        var reports = REPORTS.map(function (report) {
            return {
                id: report.id,
                url: detailUrl(report.id),
                title: report.title,
                series: report.series,
                authors: report.authors,
                published: report.published,
                cover: report.cover,
                summary: report.abstract[0] || ""
            };
        });

        return legacy.concat(reports);
    }

    global.youthResearch = {
        reports: REPORTS,
        detailUrl: detailUrl,
        findById: findById,
        toListItems: toListItems
    };
})(window);
