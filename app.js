// Family Tree Data
const generationsData = [
  {
    generation: 1,
    members: [{ name: "علي بن ابي طالب رضي الله عنه", title: "أمير المؤمنين" }]
  },
  { generation: 2, members: [{ name: "الحسن السبط" }] },
  { generation: 3, members: [{ name: "الحسن المثنى" }] },
  { generation: 4, members: [{ name: "عبدالله المحض" }] },
  { generation: 5, members: [{ name: "موسى الجون" }] },
  { generation: 6, members: [{ name: "عبدالله الرضا" }] },
  { generation: 7, members: [{ name: "سليمان" }] },
  { generation: 8, members: [{ name: "داود" }] },
  { generation: 9, members: [{ name: "علي" }] },
  { generation: 10, members: [{ name: "نعمة الله الأكبر" }] },
  { generation: 11, members: [{ name: "يوسف الزاهد" }] },
  { generation: 12, members: [{ name: "الحسن العابد" }] },
  { generation: 13, members: [{ name: "فليته" }] },
  { generation: 14, members: [{ name: "علي" }] },
  { generation: 15, members: [{ name: "نعمة الله الأصغر" }] },
  { generation: 16, members: [{ name: "سرور" }] },
  { generation: 17, members: [{ name: "مهنا" }] },
  { generation: 18, members: [{ name: "يحيى" }] },
  { generation: 19, members: [{ name: "سالم" }] },
  { generation: 20, members: [{ name: "محمد" }] },
  { generation: 21, members: [{ name: "سليمان" }] },
  { generation: 22, members: [{ name: "محمد" }] },
  { generation: 23, members: [{ name: "عيسى" }] },
  { generation: 24, members: [{ name: "محمد" }] },
  { generation: 25, members: [{ name: "يحيى" }] },
  { generation: 26, members: [{ name: "عبدالرحمن" }] },
  { generation: 27, members: [{ name: "الحسن" }] },
  { generation: 28, members: [{ name: "محمد" }] },
  { generation: 29, members: [{ name: "الحسن" }] },
  { generation: 30, members: [{ name: "محمد محرق" }] },
  { generation: 31, members: [{ name: "علي" }] },
  { generation: 32, members: [{ name: "حسين" }] },
  { generation: 33, members: [{ name: "يحي" }] },
  { generation: 34, members: [{ name: "محسن" }] },
  { generation: 35, members: [{ name: "محمد الحبكور" }] },
  { generation: 36, members: [{ name: "محسن" }] },
  { generation: 37, members: [{ name: "محمد" }] },
  { generation: 38, members: [{ name: "ناصر" }] },
  {
    generation: 39,
    members: [
      { name: "هاشم", children: [] },
      { name: "خاتمة", children: ["عبدالرحمن", "هديل", "وليد", "فاطمة", "عائشة", "نورة", "رنيم"] },
      { name: "صفية", children: ["عبدالرحمن", "احمد", "ماجدة", "تذكار", "بسام"] },
      { name: "كاملة", children: [] },
      { name: "حسين", children: ["ناصر", "عبدالعزيز", "احمد", "باسمة", "عائشة"] },
      { name: "علي", children: ["محمد", "ناصر", "مهند", "فاطمة", "ماريا", "فرح", "ملك", "عبدالله"] },
      { name: "اسماعيل", children: ["غلا", "رنا", "تالا", "ناصر"] },
      { name: "ابراهيم", children: ["ناصر", "الياس", "انصاف", "نواف", "نوف"] },
      { name: "مصطفى", children: ["ناصر", "نائل", "قصي"] },
      { name: "محمد", children: ["ناصر", "ديالا", "دانا"] },
      { name: "نورة", children: [] },
      { name: "عبدالرحمن", children: ["ايلا"] },
      { name: "احمد", children: [] },
      { name: "انصاف", children: ["حسن", "ناصر"] },
      { name: "باسمة", children: ["ريمان", "يسر"] },
      { name: "سامي", children: [] }
    ]
  }
];

// State management
let currentZoom = 1;
let collapsedGenerations = new Set();
let searchTerm = '';

// Initialize the application
function init() {
  renderTree();
  setupEventListeners();
}

// Render the complete family tree
function renderTree() {
  const treeContainer = document.getElementById('familyTree');
  treeContainer.innerHTML = '';

  generationsData.forEach((genData, index) => {
    const generationDiv = document.createElement('div');
    generationDiv.className = `generation generation-${genData.generation}`;
    generationDiv.setAttribute('data-generation', genData.generation);

    // Create generation header
    const header = document.createElement('div');
    header.className = `generation-header ${collapsedGenerations.has(genData.generation) ? 'collapsed' : ''}`;
    header.innerHTML = `
      <span class="toggle-icon">▼</span>
      <span>الجيل ${genData.generation}</span>
    `;
    header.onclick = () => toggleGeneration(genData.generation);
    generationDiv.appendChild(header);

    // Create generation content
    const content = document.createElement('div');
    content.className = `generation-content ${collapsedGenerations.has(genData.generation) ? 'collapsed' : ''}`;

    if (genData.generation === 39) {
      // Special layout for generation 39 with children
      genData.members.forEach(member => {
        const parentGroup = document.createElement('div');
        parentGroup.className = 'parent-group';

        // Parent node
        const parentNode = createPersonNode(member.name, genData.generation, member.title);
        parentGroup.appendChild(parentNode);

        // Children nodes
        if (member.children && member.children.length > 0) {
          const childrenGroup = document.createElement('div');
          childrenGroup.className = 'children-group';

          member.children.forEach(child => {
            const childNode = document.createElement('div');
            childNode.className = 'child-node';
            childNode.textContent = child;
            childNode.setAttribute('data-name', child);
            childNode.setAttribute('data-generation', '40');
            
            if (searchTerm && child.includes(searchTerm)) {
              childNode.classList.add('highlighted');
            }
            
            childrenGroup.appendChild(childNode);
          });

          parentGroup.appendChild(childrenGroup);
        }

        content.appendChild(parentGroup);
      });
    } else {
      // Standard single-member layout for generations 1-38
      genData.members.forEach(member => {
        const personNode = createPersonNode(member.name, genData.generation, member.title);
        content.appendChild(personNode);
      });
    }

    generationDiv.appendChild(content);

    // Add connection line between generations (except after last generation)
    if (index < generationsData.length - 1) {
      const connectionLine = document.createElement('div');
      connectionLine.className = 'connection-line';
      generationDiv.appendChild(connectionLine);
    }

    treeContainer.appendChild(generationDiv);
  });
}

// Create a person node element
function createPersonNode(name, generation, title = '') {
  const node = document.createElement('div');
  node.className = 'person-node';
  node.setAttribute('data-generation', generation);
  node.setAttribute('data-name', name);

  const nameDiv = document.createElement('div');
  nameDiv.className = 'person-name';
  nameDiv.textContent = name;
  node.appendChild(nameDiv);

  if (title) {
    const titleDiv = document.createElement('div');
    titleDiv.className = 'person-title';
    titleDiv.textContent = title;
    node.appendChild(titleDiv);
  }

  // Highlight if matches search
  if (searchTerm && name.includes(searchTerm)) {
    node.classList.add('highlighted');
  }

  return node;
}

// Toggle generation expand/collapse
function toggleGeneration(generation) {
  if (collapsedGenerations.has(generation)) {
    collapsedGenerations.delete(generation);
  } else {
    collapsedGenerations.add(generation);
  }
  renderTree();
}

// Expand all generations
function expandAll() {
  collapsedGenerations.clear();
  renderTree();
}

// Collapse all generations
function collapseAll() {
  generationsData.forEach(gen => {
    collapsedGenerations.add(gen.generation);
  });
  renderTree();
}

// Zoom functions
function zoomIn() {
  currentZoom = Math.min(currentZoom + 0.1, 2);
  applyZoom();
}

function zoomOut() {
  currentZoom = Math.max(currentZoom - 0.1, 0.5);
  applyZoom();
}

function resetZoom() {
  currentZoom = 1;
  applyZoom();
}

function applyZoom() {
  const treeContainer = document.getElementById('treeContainer');
  treeContainer.style.transform = `scale(${currentZoom})`;
}

// Search functionality
function handleSearch(value) {
  searchTerm = value.trim();
  
  const clearBtn = document.getElementById('clearSearch');
  const resultsDiv = document.getElementById('searchResults');
  
  if (searchTerm) {
    clearBtn.style.display = 'flex';
    
    // Count matches
    let matchCount = 0;
    generationsData.forEach(gen => {
      gen.members.forEach(member => {
        if (member.name.includes(searchTerm)) {
          matchCount++;
        }
        if (member.children) {
          member.children.forEach(child => {
            if (child.includes(searchTerm)) {
              matchCount++;
            }
          });
        }
      });
    });
    
    if (matchCount > 0) {
      resultsDiv.textContent = `تم العثور على ${matchCount} نتيجة`;
      resultsDiv.style.color = 'var(--color-primary)';
    } else {
      resultsDiv.textContent = 'لم يتم العثور على نتائج';
      resultsDiv.style.color = 'var(--color-text-secondary)';
    }
  } else {
    clearBtn.style.display = 'none';
    resultsDiv.textContent = '';
  }
  
  renderTree();
  
  // Auto-scroll to first match
  if (searchTerm) {
    setTimeout(() => {
      const firstMatch = document.querySelector('.highlighted');
      if (firstMatch) {
        firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  }
}

function clearSearch() {
  const searchInput = document.getElementById('searchInput');
  searchInput.value = '';
  handleSearch('');
}

// Setup event listeners
function setupEventListeners() {
  // Zoom controls
  document.getElementById('zoomIn').addEventListener('click', zoomIn);
  document.getElementById('zoomOut').addEventListener('click', zoomOut);
  document.getElementById('resetZoom').addEventListener('click', resetZoom);
  
  // Expand/Collapse controls
  document.getElementById('expandAll').addEventListener('click', expandAll);
  document.getElementById('collapseAll').addEventListener('click', collapseAll);
  
  // Search
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', (e) => handleSearch(e.target.value));
  
  document.getElementById('clearSearch').addEventListener('click', clearSearch);
  
  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
      if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        zoomIn();
      } else if (e.key === '-') {
        e.preventDefault();
        zoomOut();
      } else if (e.key === '0') {
        e.preventDefault();
        resetZoom();
      }
    }
    
    // Escape to clear search
    if (e.key === 'Escape') {
      clearSearch();
    }
  });
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}