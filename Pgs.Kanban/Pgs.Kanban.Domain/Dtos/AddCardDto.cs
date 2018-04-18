using System.ComponentModel.DataAnnotations;

namespace Pgs.Kanban.Domain.Dtos
{
    public class AddCardDto
    {
        [Required]
        public int ListId { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
