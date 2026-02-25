import{d as T,c as k,g as b,l as d,a as p,b as x,f as N,e as u,h as R,s as w,i as C,j as r,k as I,p as H,m as E,n as A,o as z}from"./common-C51FUouZ.js";/* empty css              */const n=s=>document.getElementById(s);window.addEventListener("load",()=>{B()});function B(){const s=n("wallet-buttons");setTimeout(()=>{const i=T();if(i.length===0){s.innerHTML='<span style="color:var(--dim)">No Solana wallet detected. Install Phantom, Solflare, or Backpack.</span>';return}s.innerHTML="";for(const e of i){const t=document.createElement("button");t.textContent=`Connect ${e.name}`,t.className="btn-outline",t.style.marginRight="8px",t.onclick=()=>S(e.provider,e.name),s.appendChild(t)}},500)}async function S(s,i){try{await k(s);const e=b();n("wallet-buttons").innerHTML=`<span class="badge badge-ok">Connected: ${i}</span>`,n("wallet-info").classList.remove("hidden"),n("w-addr").textContent=e.toBase58();const t=d(),a=p(t.rpc),l=await a.getBalance(e);n("w-bal").textContent=(l/1e9).toFixed(4)+" SOL";const o=await x(a,e,t.masterNftMint);n("w-nft").innerHTML=o?'<span class="badge badge-ok">✓ You hold the Master NFT</span>':'<span class="badge badge-fail">✗ Not the Master NFT holder</span>',n("btn-init-registry").disabled=!o,n("btn-issue-reseller").disabled=!o,await y(),await $()}catch(e){n("wallet-buttons").innerHTML=`<span class="badge badge-fail">Error: ${e.message}</span>`}}async function y(){const s=d(),i=p(s.rpc),e=await N(i,s.programId,s.masterNftMint);if(!e){n("registry-info").innerHTML=`
      <span class="badge badge-warn">Not initialized</span>
      <span style="color:var(--dim); margin-left:8px">Click "Initialize Registry" to create it.</span>`,n("btn-init-registry").textContent="Initialize Registry";return}n("btn-init-registry").disabled=!0,n("btn-init-registry").textContent="Already Initialized",n("registry-info").innerHTML=`
    <div class="info-grid">
      <span class="label">PDA</span><span class="value">${u(e.address)}</span>
      <span class="label">Authority</span><span class="value">${u(e.authority)}</span>
      <span class="label">Resellers</span><span class="value">${e.activeResellers} active / ${e.totalResellers} total</span>
      <span class="label">Licenses</span><span class="value">${e.activeLicenses} active / ${e.totalLicenses} total</span>
      <span class="label">Keyholders</span><span class="value">${e.activeKeyholders} active / ${e.totalKeyholders} total</span>
    </div>`}n("btn-init-registry").onclick=async()=>{const s=d(),i=p(s.rpc),e=b(),t=n("btn-init-registry");t.disabled=!0,t.innerHTML='Initializing…<span class="spinner"></span>';try{const a=await R(s,e),l=await w(i,[a]);t.textContent="✓ Done",await y(),alert(`Registry initialized!
TX: ${l}`)}catch(a){t.textContent="Initialize Registry",t.disabled=!1,alert(`Error: ${a.message}`)}};n("btn-issue-reseller").onclick=async()=>{const s=d(),i=p(s.rpc),e=b(),t=n("reseller-log");t.classList.remove("hidden"),C(t);const a=n("r-name").value.trim(),l=n("r-territory").value.trim(),o=parseInt(n("r-limit").value)||100,v=n("r-category").value.trim()||null,f=n("r-owner").value.trim()||e.toBase58();if(!a||!l){r(t,"Name and territory are required","error");return}const c=n("btn-issue-reseller");c.disabled=!0,c.innerHTML='Printing edition…<span class="spinner"></span>';try{r(t,"Step 1/2: Printing Metaplex Edition from Master NFT…");const g=I(s.rpc),m=await H(g,s.masterNftMint);r(t,`Edition minted! Mint: ${m.mint} (edition #${m.editionNumber})`,"ok"),r(t,"Step 2/2: Activating Reseller on-chain…"),c.innerHTML='Activating reseller…<span class="spinner"></span>';const L=await E(s,e,m.mint,f,a,l,o,v),M=await w(i,[L]);r(t,`✓ Reseller activated! TX: ${M}`,"ok"),r(t,`  NFT Mint:  ${m.mint}`,"ok"),r(t,`  Name:      ${a}`,"ok"),r(t,`  Territory: ${l}`,"ok"),r(t,`  Limit:     ${o}`,"ok"),r(t,`  Owner:     ${f}`,"ok"),await y(),await $()}catch(g){r(t,`Error: ${g.message}`,"error"),console.error(g)}finally{c.disabled=!1,c.textContent="Print Edition + Activate Reseller"}};async function $(){const s=d(),i=p(s.rpc),e=n("resellers-table");try{const t=await A(i,s.programId);if(t.length===0){e.innerHTML='<span style="color:var(--dim)">No resellers found.</span>';return}e.innerHTML=`
      <table>
        <thead>
          <tr><th>Name</th><th>Territory</th><th>Limit</th><th>Issued</th><th>Status</th><th>NFT Mint</th><th>Owner</th></tr>
        </thead>
        <tbody>
          ${t.map(a=>`
            <tr>
              <td style="font-family:sans-serif;font-weight:500">${h(a.name)}</td>
              <td style="font-family:sans-serif">${h(a.territory)}</td>
              <td>${a.issuanceLimit}</td>
              <td>${a.licensesIssued}</td>
              <td>${z(a.status)}</td>
              <td>${u(a.resellerNftMint)}</td>
              <td>${u(a.owner)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
      <p style="color:var(--dim);font-size:0.8rem;margin-top:8px">Total: ${t.length} reseller(s)</p>`}catch(t){e.innerHTML=`<span class="badge badge-fail">Error: ${t.message}</span>`}}function h(s){const i=document.createElement("span");return i.textContent=s,i.innerHTML}
