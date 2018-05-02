using System.ComponentModel.DataAnnotations;

namespace Pgs.Kanban.Domain.Models
{
    public class Card
    {
        [Key]
        public int Id { get; set; }

        public int ListId { get; set; }

        public string Description { get; set; }
  
        public virtual List List { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
