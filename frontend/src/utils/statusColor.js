const statusColor = (status) => {
  switch (status) {
    case 'Pendente':
      return 'h-3 w-3 rounded-full bg-yellow-500';
    case 'Confirmado':
      return 'h-3 w-3 rounded-full bg-cyan-600';
    case 'A caminho':
      return 'h-3 w-3 rounded-full bg-orange-600';
    default:
      return 'h-3 w-3 rounded-full bg-emerald-500'
  }
}

export default statusColor;