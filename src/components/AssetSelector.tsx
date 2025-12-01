import React, { useState, useEffect, Fragment } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { ChevronsUpDownIcon as ChevronUpDownIcon, CheckIcon, BookmarkIcon as XMarkIcon } from 'lucide-react';
import { usePortfolioStore } from '../stores/usePortfolioStore';
import toast from 'react-hot-toast';

interface Asset {
  symbol: string;
  name: string;
}

// Fallback asset data in case the API is not available
const fallbackAssets: Asset[] = [
  { symbol: 'BTC', name: 'Bitcoin' },
  { symbol: 'ETH', name: 'Ethereum' },
  { symbol: 'ADA', name: 'Cardano' },
  { symbol: 'SOL', name: 'Solana' },
  { symbol: 'DOT', name: 'Polkadot' },
  { symbol: 'AVAX', name: 'Avalanche' },
  { symbol: 'MATIC', name: 'Polygon' },
  { symbol: 'LINK', name: 'Chainlink' },
  { symbol: 'UNI', name: 'Uniswap' },
  { symbol: 'AAVE', name: 'Aave' },
  { symbol: 'COMP', name: 'Compound' },
  { symbol: 'MKR', name: 'Maker' },
  { symbol: 'SNX', name: 'Synthetix' },
  { symbol: 'YFI', name: 'yearn.finance' },
  { symbol: 'SUSHI', name: 'SushiSwap' },
  { symbol: 'CRV', name: 'Curve DAO Token' },
  { symbol: 'BAL', name: 'Balancer' },
  { symbol: '1INCH', name: '1inch' },
  { symbol: 'ALGO', name: 'Algorand' },
  { symbol: 'ATOM', name: 'Cosmos' }
];

const AssetSelector: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const { selectedAssets, setSelectedAssets } = usePortfolioStore();

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const apiUrl = import.meta.env.VITE_PORTFOLIO_API_URL;
      if (!apiUrl) {
        throw new Error('Portfolio API URL not configured');
      }
      
      const response = await fetch(`${apiUrl}/assets`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        // Add timeout to prevent hanging
        signal: AbortSignal.timeout(10000) // 10 second timeout
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setAssets(data);
      setUsingFallback(false);
    } catch (error) {
      console.warn('API not available, using fallback data:', error);
      setAssets(fallbackAssets);
      setUsingFallback(true);
      toast.error('Using demo data - API not available', {
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredAssets = query === ''
    ? assets
    : assets.filter((asset) =>
        asset.symbol.toLowerCase().includes(query.toLowerCase()) ||
        asset.name.toLowerCase().includes(query.toLowerCase())
      );

  const handleAssetToggle = (asset: Asset) => {
    const isSelected = selectedAssets.includes(asset.symbol);
    if (isSelected) {
      setSelectedAssets(selectedAssets.filter(symbol => symbol !== asset.symbol));
    } else {
      setSelectedAssets([...selectedAssets, asset.symbol]);
    }
  };

  const removeAsset = (symbol: string) => {
    setSelectedAssets(selectedAssets.filter(s => s !== symbol));
  };

  const clearAll = () => {
    setSelectedAssets([]);
  };

  if (isLoading) {
    return (
      <div className="bg-[#101417]/70 ring-1 ring-[#1b1f24] rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Select Assets</h3>
        <div className="animate-pulse">
          <div className="h-10 bg-gray-700 rounded mb-4"></div>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-8 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#101417]/70 ring-1 ring-[#1b1f24] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">
          Select Assets
          {usingFallback && (
            <span className="ml-2 text-xs text-yellow-400 bg-yellow-400/20 px-2 py-1 rounded">
              Demo Mode
            </span>
          )}
        </h3>
        {selectedAssets.length > 0 && (
          <button
            onClick={clearAll}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Selected Assets Chips */}
      {selectedAssets.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedAssets.map((symbol) => {
            const asset = assets.find(a => a.symbol === symbol);
            return (
              <div
                key={symbol}
                className="flex items-center gap-1 bg-[#43d4a0]/20 text-[#43d4a0] px-2 py-1 rounded-lg text-sm"
              >
                <span>{symbol}</span>
                <button
                  onClick={() => removeAsset(symbol)}
                  className="hover:bg-[#43d4a0]/30 rounded p-0.5"
                >
                  <XMarkIcon className="h-3 w-3" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      <Combobox value={null} onChange={handleAssetToggle}>
        <div className="relative">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-[#1b1f24] text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#43d4a0] focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-white bg-transparent focus:ring-0 focus:outline-none"
              displayValue={() => query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search assets..."
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-[#1b1f24] py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
              {filteredAssets.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-400">
                  Nothing found.
                </div>
              ) : (
                filteredAssets.map((asset) => (
                  <Combobox.Option
                    key={asset.symbol}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-[#43d4a0]/20 text-[#43d4a0]' : 'text-white'
                      }`
                    }
                    value={asset}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedAssets.includes(asset.symbol)}
                            onChange={() => {}}
                            className="mr-3 h-4 w-4 text-[#43d4a0] bg-transparent border-gray-600 rounded focus:ring-[#43d4a0] focus:ring-2"
                          />
                          <div>
                            <span className={`block truncate font-medium`}>
                              {asset.symbol}
                            </span>
                            <span className="block truncate text-sm text-gray-400">
                              {asset.name}
                            </span>
                          </div>
                        </div>
                        {selectedAssets.includes(asset.symbol) ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-[#43d4a0]' : 'text-[#43d4a0]'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>

      <div className="mt-4 text-sm text-gray-400">
        {selectedAssets.length === 0 
          ? `Select assets to analyze (default: all assets)${usingFallback ? ' - Demo data' : ''}`
          : `${selectedAssets.length} asset${selectedAssets.length === 1 ? '' : 's'} selected${usingFallback ? ' (Demo)' : ''}`
        }
      </div>
    </div>
  );
};

export default AssetSelector;