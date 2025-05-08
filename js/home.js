document.addEventListener('DOMContentLoaded', function() {
    // 获取所有需要监听的页面区块（如 <section>）
    const sections = document.querySelectorAll('section');
    
    // 为每个区块添加 IntersectionObserver 监听
    sections.forEach((section) => {
      new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // 获取导航栏所有链接
              const navLinks = document.querySelectorAll('nav a');
              
              // 遍历链接，检查是否匹配当前区块的ID
              navLinks.forEach(link => {
                const isActive = link.getAttribute('href') === `#${entry.target.id}`;
                link.classList.toggle('active', isActive);
              });
            }
          });
        },
        { 
          threshold: 0.5 // 当区块50%进入视口时触发
        }
      ).observe(section);
    });

    // 页面切换动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // 滚动进度条
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.transform = `scaleX(${scrolled / 100})`;
    });

    // 图片加载动画
    const images = document.querySelectorAll('.li2-box-item img');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }
    });

    // 3D卡片效果
    const cards = document.querySelectorAll('.carbox');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // 导航栏滚动效果
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scrolled');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 创建海洋背景
    const oceanBg = document.createElement('div');
    oceanBg.className = 'ocean-bg';
    document.body.appendChild(oceanBg);

    // 创建遮罩层
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    // 创建气泡
    function createBubbles() {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        // 随机大小
        const size = Math.random() * 60 + 20;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        // 随机位置
        bubble.style.left = `${Math.random() * 100}%`;
        
        // 随机动画延迟
        bubble.style.animationDelay = `${Math.random() * 5}s`;
        
        oceanBg.appendChild(bubble);
        
        // 动画结束后移除气泡
        bubble.addEventListener('animationend', () => {
            bubble.remove();
        });
    }

    // 定期创建气泡
    setInterval(createBubbles, 300);

    // 鼠标移动效果
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        overlay.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, 
            rgba(255, 255, 255, 0.2) 0%, 
            rgba(255, 255, 255, 0.1) 50%, 
            rgba(255, 255, 255, 0) 100%)`;
    });
});

// 获奖数据
const awardsData = [
  {
      title: "美国大学生数学建模竞赛(MCM/ICM) H奖",
      organization: "美国数学及其应用联合会",
      date: "2025年5月",
      description: "基于跨学科视角构建数学模型解决开放性问题，通过数据建模、算法优化及英文论文撰写，提出创新性解决方案。在72小时内完成问题分析、模型验证及结果可视化，体现复杂系统建模能力与团队协作水平。",
      image: "img/award/MCM_ICM.jpg"
  },
  {
      title: '2024"天翼云杯"湖北省大学生营销策划挑战赛 校赛二等奖',
      organization: "湖北省市场营销协会",
      date: "2024年11月",
      description: "设计天翼云高校数字化营销方案，基于用户画像与竞品分析制定营销策略",
      image: "img/award/yingxiao.jpg"
  },
];

// 渲染获奖卡片
function renderAwards() {
  const awardsGrid = document.getElementById('awardsGrid');
  
  awardsData.forEach(award => {
      const card = document.createElement('div');
      card.className = 'award-card';
      
      card.innerHTML = `
          <img src="${award.image}" alt="${award.title}" class="award-image">
          <div class="award-content">
              <h3 class="award-title">${award.title}</h3>
              <p class="award-organization">${award.organization}</p>
              <p class="award-date">${award.date}</p>
              <p class="award-description">${award.description}</p>
          </div>
      `;
      
      awardsGrid.appendChild(card);
  });
}

// 页面加载完成后渲染卡片
document.addEventListener('DOMContentLoaded', renderAwards);

