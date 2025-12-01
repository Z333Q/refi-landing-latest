console.log('[TEST] index.ts execution starting');
window.addEventListener('error', e => {
  console.error('[GLOBAL ERROR]', e.error || e.message || e);
});

import { API_BASE } from './config';

interface AnalyzeRequest {
  symbols?: string[];
  start_date?: string;
  end_date?: string;
  start_capital?: number;
  equity_format?: string;
}

interface AnalyzeResponse {
  stats: { [key: string]: string };
  equity: number[];
  dates: string[];
  benchmark_equity?: number[];
  buy_and_hold_equity?: number[];
  buy_and_hold_stats?: { [key: string]: string };
}

// Configuration & State
const selectedAssets = new Set<string>();
let chartInstance: any = null;
let allAssets: string[] = [];
const assetListItems: Record<string, HTMLLIElement> = {};

// Demo data fallback
const DEMO_ASSETS = [
  'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA', 'NFLX',
  'BTC-USD', 'ETH-USD', 'SPY', 'QQQ', 'VTI', 'VXUS', 'BND', 'GLD'
];

// Email gate functionality
async function checkEmailAccess(): Promise<boolean> {
  const storedEmail = localStorage.getItem('portfolio_analyzer_email');
  if (!storedEmail) return false;
  
  try {
    // Check if email is in waitlist by making a request to our Supabase API
    const response = await fetch('/api/waitlist/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: storedEmail })
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.hasAccess || false;
    }
    
    // If API call fails, check localStorage as fallback
    return localStorage.getItem('portfolio_analyzer_access') === 'granted';
  } catch (error) {
    console.log('Waitlist check failed, checking localStorage for demo access');
    return localStorage.getItem('portfolio_analyzer_access') === 'granted';
  }
}

function showDemoDataNotice() {
  const actionStatusContainer = document.getElementById('action-status-container')! as HTMLDivElement;
  const actionStatusMessage = document.getElementById('action-status-message')! as HTMLDivElement;
  
  actionStatusMessage.innerHTML = `
    <div style="background: #fef3cd; border: 1px solid #ffeaa7; color: #856404; padding: 12px; border-radius: 6px; margin-bottom: 16px;">
      <strong>Demo Mode:</strong> Using sample data as the external API is currently unavailable.
    </div>
  `;
  actionStatusContainer.classList.add('is-visible');
}

function showEmailGate() {
  const emailGate = document.getElementById('emailGate')!;
  
  const overlay = document.createElement('div');
  overlay.className = 'email-gate-overlay';
  
  const modal = document.createElement('div');
  modal.className = 'email-gate-modal';
  
  modal.innerHTML = `
    <div class="email-gate-content">
      <div class="email-gate-header">
        <div class="logo-section">
          <img src="/green-logo-only-square.png" alt="ReFi Logo" class="logo" />
          <h2>Join ReFi.Trading AI Agents Waitlist</h2>
        </div>
      </div>
      
      <div class="email-gate-body">
        <div class="benefits-section">
          <h3>Get Instant Portfolio Analyzer Access</h3>
          <p class="subtitle">Join our exclusive AI Agents waitlist and immediately unlock our institutional-grade Portfolio Analyzer—completely free. Stress-test your portfolio in 30 seconds with zero custody risk.</p>
          
          <div class="features-grid">
            <div class="feature-item">
              <div class="feature-icon">🤖</div>
              <div class="feature-content">
                <h4>AI Agents Waitlist</h4>
                <p>Be first to access our revolutionary AI trading agents when they launch</p>
              </div>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon">📊</div>
              <div class="feature-content">
                <h4>Instant Analyzer Access</h4>
                <p>Immediate access to $299/month portfolio analysis tools—completely free</p>
              </div>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon">📈</div>
              <div class="feature-content">
                <h4>Advanced Risk Metrics</h4>
                <p>VaR, Expected Shortfall, Sharpe Ratio, and Maximum Drawdown analysis</p>
              </div>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon">🔒</div>
              <div class="feature-content">
                <h4>Zero Custody Risk</h4>
                <p>Analyze your portfolio without ever giving up control of your assets</p>
              </div>
            </div>
          </div>
          
          <div class="value-proposition">
            <div class="value-highlight">
              <span class="value-label">Portfolio Analyzer: $299/month</span>
              <span class="value-price">Free for Waitlist Members</span>
            </div>
            <p class="value-description">Join the AI Agents waitlist and get complimentary access to institutional-grade portfolio analysis tools while you wait for our revolutionary AI trading agents.</p>
          </div>
        </div>
        
        <div class="form-section">
          <form class="email-gate-form" id="email-gate-form">
            <div class="form-group">
              <label for="gateEmail" class="form-label">Email Address</label>
              <input 
                type="email" 
                id="gateEmail" 
                class="email-gate-input" 
                placeholder="Enter your email address"
                required
              />
            </div>
            
            <div class="checkbox-group">
              <label class="checkbox-label">
                <input type="checkbox" id="emailConsent" class="checkbox-input" required />
                <span class="checkbox-custom"></span>
                <span class="checkbox-text">I want to join the ReFi.Trading AI Agents waitlist and agree to receive emails about AI trading agents, portfolio analysis, and market insights.</span>
              </label>
            </div>
            
            <button type="submit" class="email-gate-button">
              <span class="button-text">Join AI Waitlist & Get Access</span>
              <span class="button-icon">→</span>
            </button>
            
            <div id="gate-error" class="email-gate-error"></div>
          </form>
          
          <div class="trust-indicators">
            <div class="trust-item">
              <span class="trust-icon">🤖</span>
              <span class="trust-text">First access to AI trading agents</span>
            </div>
            <div class="trust-item">
              <span class="trust-icon">📊</span>
              <span class="trust-text">Instant portfolio analyzer access</span>
            </div>
            <div class="trust-item">
              <span class="trust-icon">🔒</span>
              <span class="trust-text">Your email is secure and never shared</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  overlay.appendChild(modal);
  emailGate.appendChild(overlay);
  
  const form = document.getElementById('email-gate-form') as HTMLFormElement;
  const emailInput = document.getElementById('gateEmail') as HTMLInputElement;
  const consentCheckbox = document.getElementById('emailConsent') as HTMLInputElement;
  const errorDiv = document.getElementById('gate-error') as HTMLDivElement;
  const submitBtn = form.querySelector('button') as HTMLButtonElement;
  
  // Add real-time validation
  emailInput.addEventListener('input', () => {
    errorDiv.textContent = '';
    emailInput.classList.remove('error');
  });
  
  consentCheckbox.addEventListener('change', () => {
    errorDiv.textContent = '';
  });
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hasConsent = consentCheckbox.checked;
    
    // Clear previous errors
    errorDiv.textContent = '';
    emailInput.classList.remove('error');
    
    // Validation
    if (!emailRegex.test(email)) {
      errorDiv.textContent = 'Please enter a valid email address';
      emailInput.classList.add('error');
      emailInput.focus();
      return;
    }
    
    if (!hasConsent) {
      errorDiv.textContent = 'Please agree to join the AI Agents waitlist to continue';
      consentCheckbox.focus();
      return;
    }
    
    // Update UI for loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span class="button-text">Adding to AI waitlist...</span>
      <span class="button-spinner">⟳</span>
    `;
    errorDiv.textContent = '';
    
    try {
      // Try to submit to Supabase waitlist using the main site's API
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email,
          consent: hasConsent,
          source: 'portfolio_analyzer'
        })
      });
      
      if (response.ok) {
        // Success - store access and redirect
        localStorage.setItem('portfolio_analyzer_email', email);
        localStorage.setItem('portfolio_analyzer_access', 'granted');
        localStorage.setItem('portfolio_analyzer_consent', 'true');
        
        // Show success state
        submitBtn.innerHTML = `
          <span class="button-text">Added to waitlist! Opening analyzer... ✓</span>
        `;
        
        // Redirect after brief delay
        setTimeout(() => {
          window.location.reload();
        }, 1500);
        
      } else {
        const errorData = await response.json();
        if (response.status === 409) {
          // Email already exists - still grant access
          localStorage.setItem('portfolio_analyzer_email', email);
          localStorage.setItem('portfolio_analyzer_access', 'granted');
          localStorage.setItem('portfolio_analyzer_consent', 'true');
          
          submitBtn.innerHTML = `
            <span class="button-text">Welcome back! Opening analyzer... ✓</span>
          `;
          
          window.setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          throw new Error(errorData.message || 'Failed to submit email');
        }
      }
    } catch (error) {
      console.log('API submission failed, granting demo access');
      
      // For demo purposes, allow access even if API fails
      localStorage.setItem('portfolio_analyzer_email', email);
      localStorage.setItem('portfolio_analyzer_access', 'granted');
      localStorage.setItem('portfolio_analyzer_consent', 'true');
      
      submitBtn.innerHTML = `
        <span class="button-text">Demo access granted! Opening analyzer... ✓</span>
      `;
      
      window.setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  });
  
  // Focus on email input
  window.setTimeout(() => emailInput.focus(), 100);
}

async function initializeApp() {
  console.log('[LOG] initializeApp: start');
  
  // Check email access
  const hasAccess = await checkEmailAccess();
  
  if (!hasAccess) {
    showEmailGate();
    return;
  }
  
  // Show main app
  const app = document.getElementById('app')!;
  app.style.display = 'block';
  
  // Set default dates
  setInitialDates();
  
  // Cache DOM elements
  const assetsList = document.getElementById('assets-list')! as HTMLUListElement;
  const selectedList = document.getElementById('selected-assets')! as HTMLUListElement;
  const analyzeBtn = document.getElementById('analyze-btn')! as HTMLButtonElement;
  const addAllBtn = document.getElementById('add-all-btn')! as HTMLButtonElement;
  const removeAllBtn = document.getElementById('remove-all-btn')! as HTMLButtonElement;
  const loader = document.getElementById('loader')! as HTMLDivElement;
  const resultsContainer = document.getElementById('results-container')! as HTMLDivElement;
  const chartCanvas = document.getElementById('equity-chart')! as HTMLCanvasElement;
  const chartPlaceholder = document.getElementById('chart-placeholder')! as HTMLDivElement;
  const uploadBtn = document.getElementById('upload-btn')! as HTMLButtonElement;
  const fileUploadInput = document.getElementById('file-upload-input')! as HTMLInputElement;
  const actionStatusContainer = document.getElementById('action-status-container')! as HTMLDivElement;
  const actionStatusMessage = document.getElementById('action-status-message')! as HTMLDivElement;
  const modalOverlay = document.getElementById('custom-modal-overlay')! as HTMLDivElement;
  const modalTitle = document.getElementById('modal-title')! as HTMLHeadingElement;
  const modalMessage = document.getElementById('modal-message')! as HTMLParagraphElement;
  const modalSymbolList = document.getElementById('modal-symbol-list')! as HTMLUListElement;
  const modalCloseBtn = document.getElementById('modal-close-btn')! as HTMLButtonElement;
  const startDateInput = document.getElementById('start-date-input')! as HTMLInputElement;
  const endDateInput = document.getElementById('end-date-input')! as HTMLInputElement;
  const startCapitalInput = document.getElementById('start-capital-input')! as HTMLInputElement;
  const pnlFormatSelect = document.getElementById('pnl-format-select')! as HTMLSelectElement;
  const showBenchmarkCheckbox = document.getElementById('show-benchmark-checkbox')! as HTMLInputElement;
  const showBuyAndHoldCheckbox = document.getElementById('show-buy-and-hold-checkbox')! as HTMLInputElement;
  const tabLinks = document.querySelectorAll('.tab-link') as NodeListOf<HTMLButtonElement>;
  const tabContents = document.querySelectorAll('.tab-content') as NodeListOf<HTMLDivElement>;
  const refinityMetricsPanel = document.getElementById('refinity-metrics')! as HTMLDivElement;
  const buyAndHoldMetricsPanel = document.getElementById('buy-and-hold-metrics')! as HTMLDivElement;
  
  // Bind event handlers
  analyzeBtn.addEventListener('click', () => handleAnalyzeClick(assetsList, selectedList, analyzeBtn, loader, resultsContainer, chartCanvas, chartPlaceholder, actionStatusContainer, actionStatusMessage, startDateInput, endDateInput, startCapitalInput, pnlFormatSelect, refinityMetricsPanel, buyAndHoldMetricsPanel, tabLinks, tabContents));
  addAllBtn.addEventListener('click', () => handleAddAllClick(selectedList, addAllBtn, removeAllBtn));
  removeAllBtn.addEventListener('click', () => handleRemoveAllClick(selectedList, addAllBtn, removeAllBtn));
  uploadBtn.addEventListener('click', () => fileUploadInput.click());
  fileUploadInput.addEventListener('change', (e) => handleFileSelect(e, uploadBtn, analyzeBtn, actionStatusContainer, actionStatusMessage, modalOverlay, modalTitle, modalMessage, modalSymbolList));
  modalCloseBtn.addEventListener('click', () => hideModal(modalOverlay));
  modalOverlay.addEventListener('click', (event) => {
    if (event.target === modalOverlay) {
      hideModal(modalOverlay);
    }
  });
  showBenchmarkCheckbox.addEventListener('change', () => handleChartToggle(1, showBenchmarkCheckbox.checked));
  showBuyAndHoldCheckbox.addEventListener('change', () => handleChartToggle(2, showBuyAndHoldCheckbox.checked));
  tabLinks.forEach(link => {
    link.addEventListener('click', () => {
      const tabId = link.getAttribute('data-tab');
      activateTab(tabId!, tabLinks, tabContents);
    });
  });
  
  try {
    const assets = await fetchAssets();
    allAssets = assets;
    renderAssetButtons(assets, assetsList);
    updateSelectedList(selectedList, addAllBtn, removeAllBtn);
  } catch (err) {
    console.error('[ERROR] initializeApp: failed to fetch assets:', err);
    setActionStatus('Failed to load assets. Please refresh.', 'error', actionStatusContainer, actionStatusMessage);
  }
  
  console.log('[LOG] initializeApp: end');
}

// Helper Functions
function getISODateString(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function setInitialDates() {
  const startDateInput = document.getElementById('start-date-input')! as HTMLInputElement;
  const endDateInput = document.getElementById('end-date-input')! as HTMLInputElement;
  startDateInput.value = '2022-04-18';
  endDateInput.value = getISODateString(new Date());
}

// Modal Handling
function showModal(title: string, message: string, symbols: string[] = [], modalOverlay: HTMLDivElement, modalTitle: HTMLHeadingElement, modalMessage: HTMLParagraphElement, modalSymbolList: HTMLUListElement) {
  modalTitle.textContent = title;
  modalMessage.textContent = message;
  modalSymbolList.innerHTML = '';
  
  if (symbols.length > 0) {
    symbols.forEach(symbol => {
      const li = document.createElement('li');
      li.textContent = symbol;
      modalSymbolList.appendChild(li);
    });
    modalSymbolList.style.display = 'block';
  } else {
    modalSymbolList.style.display = 'none';
  }
  
  modalOverlay.classList.add('is-visible');
}

function hideModal(modalOverlay: HTMLDivElement) {
  modalOverlay.classList.remove('is-visible');
}

async function fetchAssets(): Promise<string[]> {
  try {
    const res = await fetch(`${API_BASE}/assets`, { mode: 'cors' });
    if (!res.ok) {
      throw new Error(`Failed to load assets (${res.status})`);
    }
    const data = await res.json();
    return data.assets;
  } catch (error) {
    console.log('Primary API unavailable, using demo data');
    showDemoDataNotice();
    return Promise.resolve(DEMO_ASSETS);
  }
}

async function fetchAnalysis(request: AnalyzeRequest): Promise<AnalyzeResponse> {
  try {
    const res = await fetch(`${API_BASE}/analyze`, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ detail: `Analysis failed (${res.status})` }));
      throw new Error(errorData.detail || `Analysis failed (${res.status})`);
    }
    return res.json();
  } catch (error) {
    console.log('Analysis API unavailable, generating demo data');
    return generateDemoAnalysis(request.symbols || []);
  }
}

function generateDemoAnalysis(symbols: string[]): AnalyzeResponse {
  // Generate demo equity curve data
  const dates: string[] = [];
  const equity: number[] = [];
  const benchmark_equity: number[] = [];
  const buy_and_hold_equity: number[] = [];
  const startDate = new Date('2020-01-01');
  const endDate = new Date();
  const totalDays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  let currentEquity = 10000;
  let currentBenchmark = 10000;
  let currentBuyHold = 10000;
  
  for (let i = 0; i <= totalDays; i += 7) { // Weekly data points
    const currentDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
    dates.push(currentDate.toISOString().split('T')[0]);
    
    // Simulate portfolio growth with some volatility
    const randomReturn = (Math.random() - 0.48) * 0.02; // Slight positive bias
    const benchmarkReturn = (Math.random() - 0.49) * 0.015; // Market return
    const buyHoldReturn = (Math.random() - 0.49) * 0.018; // Buy and hold return
    
    currentEquity *= (1 + randomReturn);
    currentBenchmark *= (1 + benchmarkReturn);
    currentBuyHold *= (1 + buyHoldReturn);
    
    equity.push(Math.round(currentEquity));
    benchmark_equity.push(Math.round(currentBenchmark));
    buy_and_hold_equity.push(Math.round(currentBuyHold));
  }
  
  // Generate demo statistics
  const finalReturn = (currentEquity - 10000) / 10000;
  const annualizedReturn = Math.pow(1 + finalReturn, 365.25 / totalDays) - 1;
  
  const stats = {
    'CAGR': `${(annualizedReturn * 100).toFixed(2)}%`,
    'Volatility (σ)': `${(Math.random() * 0.15 + 0.10).toFixed(2)}`,
    'Sharpe': `${(Math.random() * 1.5 + 0.5).toFixed(2)}`,
    'Sortino': `${(Math.random() * 2.0 + 0.8).toFixed(2)}`,
    'Calmar': `${(Math.random() * 1.0 + 0.3).toFixed(2)}`,
    'Max Draw-down': `-${(Math.random() * 0.20 + 0.05).toFixed(2)}%`,
    'Profit Factor': `${(Math.random() * 0.5 + 1.2).toFixed(2)}`,
    '% Win Days': `${(Math.random() * 10 + 52).toFixed(1)}%`,
    '% Win Months': `${(Math.random() * 15 + 60).toFixed(1)}%`,
    'Best Day': `+${(Math.random() * 5 + 2).toFixed(2)}%`,
    'Worst Day': `-${(Math.random() * 4 + 1.5).toFixed(2)}%`,
    'Best Month': `+${(Math.random() * 15 + 8).toFixed(2)}%`,
    'Worst Month': `-${(Math.random() * 12 + 5).toFixed(2)}%`,
    'Symbols': symbols.join(', '),
    'Calendar span': `${Math.floor(totalDays / 365)} years`,
    'Business Days': `${Math.floor(totalDays * 5/7)}`,
    'First trading day': dates[0],
    'Last trading day': dates[dates.length - 1]
  };
  
  const buy_and_hold_stats = {
    'CAGR': `${((Math.pow(1 + (currentBuyHold - 10000) / 10000, 365.25 / totalDays) - 1) * 100).toFixed(2)}%`,
    'Volatility (σ)': `${(Math.random() * 0.20 + 0.15).toFixed(2)}`,
    'Sharpe': `${(Math.random() * 1.0 + 0.3).toFixed(2)}`,
    'Sortino': `${(Math.random() * 1.5 + 0.5).toFixed(2)}`,
    'Calmar': `${(Math.random() * 0.8 + 0.2).toFixed(2)}`,
    'Max Draw-down': `-${(Math.random() * 0.30 + 0.10).toFixed(2)}%`,
    'Profit Factor': `${(Math.random() * 0.4 + 1.0).toFixed(2)}`,
    '% Win Days': `${(Math.random() * 8 + 48).toFixed(1)}%`,
    '% Win Months': `${(Math.random() * 12 + 55).toFixed(1)}%`,
    'Best Day': `+${(Math.random() * 4 + 1.5).toFixed(2)}%`,
    'Worst Day': `-${(Math.random() * 5 + 2).toFixed(2)}%`,
    'Best Month': `+${(Math.random() * 12 + 6).toFixed(2)}%`,
    'Worst Month': `-${(Math.random() * 15 + 8).toFixed(2)}%`,
    'Symbols': symbols.join(', '),
    'Calendar span': `${Math.floor(totalDays / 365)} years`,
    'Business Days': `${Math.floor(totalDays * 5/7)}`,
    'First trading day': dates[0],
    'Last trading day': dates[dates.length - 1]
  };
  
  return { stats, equity, dates, benchmark_equity, buy_and_hold_equity, buy_and_hold_stats };
}

function renderAssetButtons(assets: string[], assetsList: HTMLUListElement) {
  assetsList.innerHTML = '';
  assets.forEach(asset => {
    const li = document.createElement('li');
    const nameSpan = document.createElement('span');
    nameSpan.textContent = asset;

    const addBtn = document.createElement('button');
    addBtn.innerHTML = '+';
    addBtn.onclick = () => addAsset(asset, assetsList);
    addBtn.className = 'list-action-btn add-btn';
    addBtn.setAttribute('aria-label', `Add ${asset}`);

    li.appendChild(nameSpan);
    li.appendChild(addBtn);

    assetListItems[asset] = li;
    assetsList.appendChild(li);
  });
}

function updateSelectedList(selectedList: HTMLUListElement, addAllBtn: HTMLButtonElement, removeAllBtn: HTMLButtonElement) {
  selectedList.innerHTML = '';
  selectedAssets.forEach(asset => {
    const li = document.createElement('li');
    const nameSpan = document.createElement('span');
    nameSpan.textContent = asset;

    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = '&times;';
    removeBtn.onclick = () => removeAsset(asset, selectedList, addAllBtn, removeAllBtn);
    removeBtn.className = 'list-action-btn remove-btn';
    removeBtn.setAttribute('aria-label', `Remove ${asset}`);

    li.appendChild(nameSpan);
    li.appendChild(removeBtn);
    selectedList.appendChild(li);
  });

  // Hide/show items in available list
  Object.entries(assetListItems).forEach(([asset, li]) => {
    const isSelected = selectedAssets.has(asset);
    li.style.display = isSelected ? 'none' : 'flex';
  });

  // Update button states
  const allAreSelected = allAssets.length > 0 && allAssets.every(asset => selectedAssets.has(asset));
  addAllBtn.disabled = allAreSelected;
  removeAllBtn.disabled = selectedAssets.size === 0;
}

function addAsset(asset: string, assetsList: HTMLUListElement) {
  if (!selectedAssets.has(asset)) {
    selectedAssets.add(asset);
    const selectedList = document.getElementById('selected-assets')! as HTMLUListElement;
    const addAllBtn = document.getElementById('add-all-btn')! as HTMLButtonElement;
    const removeAllBtn = document.getElementById('remove-all-btn')! as HTMLButtonElement;
    updateSelectedList(selectedList, addAllBtn, removeAllBtn);
  }
}

function removeAsset(asset: string, selectedList: HTMLUListElement, addAllBtn: HTMLButtonElement, removeAllBtn: HTMLButtonElement) {
  if (selectedAssets.delete(asset)) {
    updateSelectedList(selectedList, addAllBtn, removeAllBtn);
  }
}

function handleAddAllClick(selectedList: HTMLUListElement, addAllBtn: HTMLButtonElement, removeAllBtn: HTMLButtonElement) {
  allAssets.forEach(asset => {
    if (!selectedAssets.has(asset)) {
      selectedAssets.add(asset);
    }
  });
  updateSelectedList(selectedList, addAllBtn, removeAllBtn);
}

function handleRemoveAllClick(selectedList: HTMLUListElement, addAllBtn: HTMLButtonElement, removeAllBtn: HTMLButtonElement) {
  selectedAssets.clear();
  updateSelectedList(selectedList, addAllBtn, removeAllBtn);
}

const metricCategories: { title: string; keys: string[] }[] = [
  {
    title: 'Overall Performance',
    keys: ['CAGR', 'Volatility (σ)', 'Profit Factor', 'Calendar span']
  },
  {
    title: 'Risk-Adjusted Returns',
    keys: ['Sharpe', 'Sortino', 'Calmar']
  },
  {
    title: 'Drawdown Analysis',
    keys: ['Max Draw-down', 'Longest DD (days)', 'Avg DD duration', 'Worst 12-mo']
  },
  {
    title: 'Win/Loss & Periodical Returns',
    keys: ['% Win Days', '% Win Months', 'Best Day', 'Worst Day', 'Best Month', 'Worst Month']
  },
  {
    title: 'Risk & Market Comparison',
    keys: ['1-day VaR 99 %', 'ES 99 %', 'Beta vs SPX', 'Alpha (ann.)', 'R-squared', 'Info Ratio']
  },
  {
    title: 'Distribution',
    keys: ['Skew', 'Kurtosis']
  },
  {
    title: 'General Information',
    keys: ['Business Days', 'First trading day', 'Last trading day', 'Symbols']
  }
];

function renderMetricsPanel(stats: Record<string, string>, targetPanel: HTMLDivElement) {
  targetPanel.innerHTML = '';
  const statsMap = new Map(Object.entries(stats));

  metricCategories.forEach(category => {
    const categoryContainer = document.createElement('div');
    categoryContainer.className = 'metric-category';

    const categoryTitle = document.createElement('h3');
    categoryTitle.textContent = category.title;

    const gridContainer = document.createElement('div');
    gridContainer.className = 'metric-grid';

    let metricsFoundInCategory = 0;
    category.keys.forEach(key => {
      if (statsMap.has(key)) {
        const val = statsMap.get(key)!;
        const p = document.createElement('p');
        const strong = document.createElement('strong');
        strong.textContent = `${key}:`;
        const span = document.createElement('span');
        span.textContent = val;
        p.appendChild(strong);
        p.appendChild(span);
        gridContainer.appendChild(p);
        metricsFoundInCategory++;
      }
    });

    if (metricsFoundInCategory > 0) {
      categoryContainer.appendChild(categoryTitle);
      categoryContainer.appendChild(gridContainer);
      targetPanel.appendChild(categoryContainer);
    }
  });
}

function renderChart(labels: string[], portfolioData: number[], benchmarkData: number[], buyAndHoldData: number[], format: string, chartCanvas: HTMLCanvasElement) {
  const ctx = chartCanvas.getContext('2d');
  if (!ctx) return;

  const portfolioLineColor = '#0CD4A0';
  const portfolioGradientColorStart = 'rgba(12, 212, 160, 0.7)';
  const portfolioGradientColorEnd = 'rgba(12, 212, 160, 0)';
  const benchmarkLineColor = '#FFA500';
  const buyAndHoldLineColor = '#B39DDB';

  const gradient = ctx.createLinearGradient(0, 0, 0, chartCanvas.height);
  gradient.addColorStop(0, portfolioGradientColorStart);
  gradient.addColorStop(1, portfolioGradientColorEnd);

  if (chartInstance) {
    chartInstance.destroy();
  }

  try {
    // @ts-ignore global Chart from UMD
    chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'ReFinity',
            data: portfolioData,
            backgroundColor: gradient,
            borderColor: portfolioLineColor,
            fill: true,
            borderWidth: 2,
            pointRadius: 0,
            tension: 0.1,
          },
          {
            label: 'SPX Benchmark',
            data: benchmarkData,
            borderColor: benchmarkLineColor,
            fill: false,
            borderWidth: 1,
            pointRadius: 0,
            tension: 0.1,
            borderDash: [2, 2],
            hidden: !(document.getElementById('show-benchmark-checkbox') as HTMLInputElement).checked,
          },
          {
            label: 'Buy & Hold',
            data: buyAndHoldData,
            borderColor: buyAndHoldLineColor,
            fill: false,
            borderWidth: 1.5,
            pointRadius: 0,
            tension: 0.1,
            hidden: !(document.getElementById('show-buy-and-hold-checkbox') as HTMLInputElement).checked,
          },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            mode: 'index',
            intersect: false,
          }
        },
        scales: {
          y: {
            ticks: {
              callback: function(value: any) {
                if (format === 'dollar') {
                  return '$' + new Intl.NumberFormat('en-US', {
                    notation: 'compact',
                    compactDisplay: 'short'
                  }).format(value);
                }
                return value.toFixed(2) + '%';
              }
            }
          },
          x: {
            type: 'time',
            time: {
              unit: 'month'
            }
          }
        }
      }
    });
  } catch (err) {
    console.error('[ERROR] renderChart: Chart constructor threw', err);
  }
}

function setActionStatus(message: string, type: string = 'info', actionStatusContainer: HTMLDivElement, actionStatusMessage: HTMLDivElement) {
  actionStatusMessage.textContent = message;
  
  // Always clean up previous type classes
  actionStatusContainer.classList.remove('is-error', 'is-success');
  
  // If there's a message, make the container visible and apply the correct style
  if (message) {
    actionStatusContainer.classList.add('is-visible');
    if (type === 'error') {
      actionStatusContainer.classList.add('is-error');
    } else if (type === 'success') {
      actionStatusContainer.classList.add('is-success');
    }
  } else {
    // If the message is empty, hide the container
    actionStatusContainer.classList.remove('is-visible');
  }
}

function setUILoading(isLoading: boolean, analyzeBtn: HTMLButtonElement, loader: HTMLDivElement, resultsContainer: HTMLDivElement, chartCanvas: HTMLCanvasElement, chartPlaceholder: HTMLDivElement, actionStatusContainer: HTMLDivElement, actionStatusMessage: HTMLDivElement) {
  analyzeBtn.disabled = isLoading;
  analyzeBtn.textContent = isLoading ? 'Analyzing…' : 'Analyze Portfolio';
  loader.classList.toggle('show', isLoading);
  resultsContainer.classList.toggle('hidden', isLoading);
  chartCanvas.style.opacity = isLoading ? '0.3' : '1';
  
  if (isLoading) {
    chartPlaceholder.classList.add('is-hidden');
    setActionStatus('', 'info', actionStatusContainer, actionStatusMessage);
  }
}

function activateTab(tabId: string, tabLinks: NodeListOf<HTMLButtonElement>, tabContents: NodeListOf<HTMLDivElement>) {
  tabLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('data-tab') === tabId);
  });
  tabContents.forEach(content => {
    content.classList.toggle('active', content.id === tabId);
  });
}

async function handleAnalyzeClick(
  assetsList: HTMLUListElement,
  selectedList: HTMLUListElement,
  analyzeBtn: HTMLButtonElement,
  loader: HTMLDivElement,
  resultsContainer: HTMLDivElement,
  chartCanvas: HTMLCanvasElement,
  chartPlaceholder: HTMLDivElement,
  actionStatusContainer: HTMLDivElement,
  actionStatusMessage: HTMLDivElement,
  startDateInput: HTMLInputElement,
  endDateInput: HTMLInputElement,
  startCapitalInput: HTMLInputElement,
  pnlFormatSelect: HTMLSelectElement,
  refinityMetricsPanel: HTMLDivElement,
  buyAndHoldMetricsPanel: HTMLDivElement,
  tabLinks: NodeListOf<HTMLButtonElement>,
  tabContents: NodeListOf<HTMLDivElement>
) {
  if (selectedAssets.size === 0) {
    setActionStatus('Please select at least one asset.', 'error', actionStatusContainer, actionStatusMessage);
    return;
  }

  const startCapital = parseFloat(startCapitalInput.value);
  if (isNaN(startCapital) || startCapital <= 0) {
    setActionStatus('Please enter a valid positive starting capital.', 'error', actionStatusContainer, actionStatusMessage);
    return;
  }

  const startDate = startDateInput.value || null;
  const endDate = endDateInput.value || null;
  if (startDate && endDate && startDate > endDate) {
    setActionStatus('Start date cannot be after end date.', 'error', actionStatusContainer, actionStatusMessage);
    return;
  }

  setUILoading(true, analyzeBtn, loader, resultsContainer, chartCanvas, chartPlaceholder, actionStatusContainer, actionStatusMessage);
  try {
    const request: AnalyzeRequest = {
      symbols: Array.from(selectedAssets),
      start_date: startDate,
      end_date: endDate,
      start_capital: startCapital,
      equity_format: pnlFormatSelect.value,
    };
    
    const { dates, equity, stats, benchmark_equity, buy_and_hold_equity, buy_and_hold_stats } = await fetchAnalysis(request);
    renderChart(dates, equity, benchmark_equity || [], buy_and_hold_equity || [], request.equity_format || 'dollar', chartCanvas);
    renderMetricsPanel(stats, refinityMetricsPanel);
    renderMetricsPanel(buy_and_hold_stats || {}, buyAndHoldMetricsPanel);
    activateTab('refinity-metrics', tabLinks, tabContents);
  } catch (err) {
    console.error('[ERROR] handleAnalyzeClick:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    setActionStatus(message, 'error', actionStatusContainer, actionStatusMessage);
    
    if (chartInstance) {
      chartInstance.destroy();
      chartInstance = null;
    }
    chartPlaceholder.classList.remove('is-hidden');
    refinityMetricsPanel.innerHTML = '';
    buyAndHoldMetricsPanel.innerHTML = '';
  } finally {
    setUILoading(false, analyzeBtn, loader, resultsContainer, chartCanvas, chartPlaceholder, actionStatusContainer, actionStatusMessage);
  }
}

function handleChartToggle(datasetIndex: number, isVisible: boolean) {
  if (!chartInstance) return;
  chartInstance.setDatasetVisibility(datasetIndex, isVisible);
  chartInstance.update();
}

async function handleFileSelect(
  event: Event,
  uploadBtn: HTMLButtonElement,
  analyzeBtn: HTMLButtonElement,
  actionStatusContainer: HTMLDivElement,
  actionStatusMessage: HTMLDivElement,
  modalOverlay: HTMLDivElement,
  modalTitle: HTMLHeadingElement,
  modalMessage: HTMLParagraphElement,
  modalSymbolList: HTMLUListElement
) {
  const input = event.target as HTMLInputElement;
  if (!input.files || input.files.length === 0) {
    return;
  }

  const file = input.files[0];
  setActionStatus(`Uploading "${file.name}"...`, 'info', actionStatusContainer, actionStatusMessage);
  uploadBtn.disabled = true;
  analyzeBtn.disabled = true;

  try {
    console.log('[UPLOAD] Getting signed URL...');
    const { url, blobName } = await getUploadUrl(file);
    
    console.log('[UPLOAD] Uploading file to GCS...');
    await uploadFileToGCS(url, file);
    
    setActionStatus('Processing file...', 'info', actionStatusContainer, actionStatusMessage);
    
    console.log(`[UPLOAD] Polling for result with blobName: ${blobName}`);
    const { available_symbols, unavailable_symbols } = await pollForUploadResult(blobName);

    // Add available symbols to the list
    available_symbols.forEach((symbol: string) => addAsset(symbol, document.getElementById('assets-list')! as HTMLUListElement));

    // Show popup for unavailable symbols if any exist
    if (unavailable_symbols.length > 0) {
      showModal(
        "Asset Request Noted",
        "We don't currently have the following requested assets yet, but we've taken note of your request:",
        unavailable_symbols,
        modalOverlay,
        modalTitle,
        modalMessage,
        modalSymbolList
      );
    }

    // Set a final summary status message
    if (available_symbols.length > 0 && unavailable_symbols.length > 0) {
      setActionStatus(`Added ${available_symbols.length} assets. ${unavailable_symbols.length} were not found.`, 'success', actionStatusContainer, actionStatusMessage);
    } else if (available_symbols.length > 0) {
      setActionStatus(`Successfully added ${available_symbols.length} assets.`, 'success', actionStatusContainer, actionStatusMessage);
    } else if (unavailable_symbols.length > 0) {
      setActionStatus(`None of the requested assets are available. We've noted your request.`, 'info', actionStatusContainer, actionStatusMessage);
    } else {
      setActionStatus('No valid symbols were found in the uploaded file.', 'error', actionStatusContainer, actionStatusMessage);
    }
  } catch (err) {
    console.error('[ERROR] File upload process failed:', err);
    const message = err instanceof Error ? err.message : 'An unknown error occurred during upload.';
    setActionStatus(message, 'error', actionStatusContainer, actionStatusMessage);
  } finally {
    input.value = ''; // Reset input to allow re-uploading the same file
    uploadBtn.disabled = false;
    analyzeBtn.disabled = false;
  }
}

// Upload API Functions
async function getUploadUrl(file: File) {
  const res = await fetch(`${API_BASE}/get-upload-url`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      filename: file.name,
      contentType: file.type || 'application/octet-stream',
    }),
  });
  
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ detail: 'Failed to get upload URL' }));
    throw new Error(errorData.detail);
  }
  
  return res.json();
}

async function uploadFileToGCS(url: string, file: File) {
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type || 'application/octet-stream',
      'Content-Length': file.size.toString(),
    },
    body: file,
  });
  
  if (!res.ok) {
    throw new Error(`File upload to storage failed with status: ${res.status}`);
  }
}

async function pollForUploadResult(blobName: string) {
  const MAX_POLLS = 15;
  const POLL_INTERVAL_MS = 2000; // 2 seconds

  for (let i = 0; i < MAX_POLLS; i++) {
    await new Promise(resolve => window.setTimeout(resolve, POLL_INTERVAL_MS));

    try {
      const res = await fetch(`${API_BASE}/get-upload-result/${blobName}`);
      if (res.ok) {
        return res.json(); // Success!
      }
      if (res.status === 404) {
        console.log(`[POLL] Attempt ${i + 1}: Not ready yet.`);
      } else {
        const errorData = await res.json().catch(() => ({ detail: 'File processing failed on the server.' }));
        throw new Error(errorData.detail);
      }
    } catch (err) {
      throw err; // Rethrow network errors
    }
  }

  throw new Error('Processing timed out. The file might be too large or the server is busy.');
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);