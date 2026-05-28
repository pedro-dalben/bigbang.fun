export interface ServerStatus {
  online: boolean;
  playersOnline: number;
  maxPlayers: number;
  version: string;
  motd: string;
  ping: number;
  playersList: { name: string; id: string }[];
}

// Mock data realistic for BigBangCraft
const MOCK_STATUS: ServerStatus = {
  online: true,
  playersOnline: 42,
  maxPlayers: 100,
  version: 'AllTheMons',
  motd: 'BigBangCraft | O melhor servidor Modded do Brasil!',
  ping: 18,
  playersList: [
    { name: 'SteveGamer', id: '1' },
    { name: 'Alex_Pro', id: '2' },
    { name: 'NotchSlayer', id: '3' },
    { name: 'CreepMaster', id: '4' },
    { name: 'DiamondMiner', id: '5' },
    { name: 'RedstoneGod', id: '6' },
    { name: 'EnderQueen', id: '7' },
    { name: 'Phantom_BR', id: '8' },
    { name: 'PixelCrafter', id: '9' },
    { name: 'CyberMine', id: '10' },
    { name: 'LordVader', id: '11' },
    { name: 'GamerGirl99', id: '12' },
    { name: 'ShadowNinja', id: '13' },
    { name: 'IronGolem_Hugs', id: '14' },
    { name: 'WitherBane', id: '15' }
  ]
};

export async function fetchServerStatus(serverIp: string = 'bigbangcraft.fun'): Promise<ServerStatus> {
  try {
    // Chamada real para a API pública de status de servidores Minecraft
    const response = await fetch(`https://api.mcsrvstat.us/3/${serverIp}`);
    const data = await response.json();

    if (data && data.online) {
      return {
        online: true,
        playersOnline: data.players?.online ?? 0,
        maxPlayers: data.players?.max ?? 100,
        version: data.version || 'AllTheMons',
        motd: data.motd?.clean
          ? data.motd.clean.join(' ')
              .replace(/&lt;|</g, '')
              .replace(/\s+/g, ' ')
              .trim()
          : MOCK_STATUS.motd,
        ping: 25, // O ping pode ser estimado ou fixado caso a API não retorne com precisão
        playersList: data.players?.list ? data.players.list.map((player: { name: string; uuid: string }, index: number) => ({
          name: player.name,
          id: player.uuid || String(index)
        })) : []
      };
    } else {
      return {
        ...MOCK_STATUS,
        online: false,
        playersOnline: 0,
        playersList: []
      };
    }
  } catch (error) {
    console.error('Erro ao buscar status da API real. Usando fallback mockado com status offline:', error);
    return {
      ...MOCK_STATUS,
      online: false,
      playersOnline: 0,
      playersList: []
    };
  }
}
