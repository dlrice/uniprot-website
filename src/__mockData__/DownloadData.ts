const mockDownloadApi = {
  request:
    'https://wwwdev.ebi.ac.uk/uniprot/api/uniprotkb/download?compressed=true&format=fasta&query=nod2&size=10',
  response: {
    headers: { 'content-type': 'text/fasta' },
    data: `>sp|Q9HC29|NOD2_HUMAN Nucleotide-binding oligomerization domain-containing protein 2 OS=Homo sapiens OX=9606 GN=NOD2 PE=1 SV=1
  MGEEGGSASHDEEERASVLLGHSPGCEMCSQEAFQAQRSQLVELLVSGSLEGFESVLDWL
  LSWEVLSWEDYEGFHLLGQPLSHLARRLLDTVWNKGTWACQKLIAAAQEAQADSQSPKLH
  and so on nine more times...
  `,
  },
};

export default mockDownloadApi;
