function getTrustWalletFromWindow() {
    const isTrustWallet = (ethereum) => {
      // Identify if Trust Wallet injected provider is present.
      const trustWallet = !!ethereum.isTrust;
  
      return trustWallet;
    };
  
    const injectedProviderExist =
      typeof window !== "undefined" && typeof window.ethereum !== "undefined";
  
    if (!injectedProviderExist) {
      return null;
    }
  
    if (isTrustWallet(window.ethereum)) {
      return window.ethereum;
    }
  
    if (window.ethereum?.providers)
      return window.ethereum.providers.find(isTrustWallet) ?? null;

      return window["trustwallet"] ?? null;
    }

async function listenForTrustWalletInitialized(
    { timeout } = { timeout: 2000 }
  ) {
    return new Promise((resolve) => {
      const handleInitialization = () => {
        resolve(getTrustWalletFromWindow());
      };
  
      window.addEventListener("trustwallet#initialized", handleInitialization, {
        once: true,
      });
  
      setTimeout(() => {
        window.removeEventListener(
          "trustwallet#initialized",
          handleInitialization,
          { once: true }
        );
        resolve(null);
      }, timeout);
    });
  }

async function getTrustWalletInjectedProvider(
    { timeout } = { timeout: 3000 }
  ) {
    const provider = getTrustWalletFromWindow();
  
    if (provider) {
      return provider;
    }
  
    return listenForTrustWalletInitialized({ timeout });
  }
  
  async function listenForTrustWalletInitialized(
    { timeout } = { timeout: 3000 }
  ) {
    return new Promise((resolve) => {
      const handleInitialization = () => {
        resolve(getTrustWalletFromWindow());
      };
  
      window.addEventListener("trustwallet#initialized", handleInitialization, {
        once: true,
      });
  
      setTimeout(() => {
        window.removeEventListener(
          "trustwallet#initialized",
          handleInitialization,
          { once: true }
        );
        resolve(null);
      }, timeout);
    });
  }
  
  function getTrustWalletFromWindow() {
    const isTrustWallet = (ethereum) => {
      // Identify if Trust Wallet injected provider is present.
      const trustWallet = !!ethereum.isTrust;
  
      return trustWallet;
    };
  
    const injectedProviderExist =
      typeof window !== "undefined" && typeof window.ethereum !== "undefined";
  
    // No injected providers exist.
    if (!injectedProviderExist) {
      return null;
    }
  
    // Trust Wallet was injected into window.ethereum.
    if (isTrustWallet(window.ethereum)) {
      return window.ethereum;
    }
  
    // Trust Wallet provider might be replaced by another
    // injected provider, check the providers array.
    if (window.ethereum?.providers) {
      // ethereum.providers array is a non-standard way to
      // preserve multiple injected providers. Eventually, EIP-5749
      // will become a living standard and we will have to update this.
      return window.ethereum.providers.find(isTrustWallet) ?? null;
    }
  
    // Trust Wallet injected provider is available in the global scope.
    // There are cases that some cases injected providers can replace window.ethereum
    // without updating the ethereum.providers array. To prevent issues where
    // the TW connector does not recognize the provider when TW extension is installed,
    // we begin our checks by relying on TW's global object.
    return window["trustwallet"] ?? null;
  }

if(typeof window.etherem !== "undefined"){
    const btn = document.getElementById("wer");

    btn.addEventListener("click",async ()=>{
        try{
            await injectedProvider.request({ methos: 'eth_requestaccounta' });
            alert("successfully connected")
            
            const account = await injectedProvider({ method: 'eth_accounts'});
            alert("jdshjfh: ")
        }
        catch{
            alert("error to connect")
        }
    })
}
else{
    alert("not found")
}