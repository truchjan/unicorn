package cz.truchjan.unicorn.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "history")
public class History {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "history_id")
	private Long id;

	@NonNull
	@Column(name = "property")
	private String property;

	@NonNull
	@Column(name = "changed_from")
	private String changedFrom;

	@NonNull
	@Column(name = "changed_to")
	private String changedTo;

	@JsonBackReference
	@ManyToOne
	@JoinColumn(name = "history_link_id")
	@JsonIgnoreProperties("history")
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Link link;
}
